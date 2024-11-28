# Stored Procedure: sp_prt_DatosFinancieros

## Usa los objetos:
- [[e]]
- [[prt_portal_DatosFinancieros]]
- [[prt_Portal_Historial_DatosFinancieros]]
- [[rhh_emplea]]
- [[sp_prt_CambiosHVDatosFinancieros]]

```sql


-- =============================================
-- Author:		Alexander Vargas 
-- Create date: 03/03/2023
-- Description:	Obtienen los datos financieros del empleado teniendo en cuenta los cambios que el empleado envio.

--exec sp_prt_DatosFinancieros '1012389184','CONSULTA'


-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_DatosFinancieros] 
	@cod_Emp		NVARCHAR(12)='',
	@Opcion			NVARCHAR(30),
	@XMLParam		XML = NULL


	
	
--WITH ENCRYPTION
AS
BEGIN

	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	--VARIABLES XML
	DECLARE @iDocHandler	INT
			--@cod_Emp		CHAR(12) ='';
	
	
	/*Crea Tabla temporal para cargar los datos del XML*/
	IF OBJECT_ID('tempdb..#tbDatosEstModificados')  IS NULL
	BEGIN
		create table #tbDatosEstModificados
		(
			cod_emp			varchar(12) NOT NULL,
			ind_DecRenta	char(1)  NULL,
			met_ret			smallint	 NULL,
			pto_gas			money		NULL,
			Cpto_deudas		nvarchar(MAX) NULL,
			per_car			smallint	NULL,
			deudas			bit			NULL			
		)
	END
	ELSE
	BEGIN
		delete #tbDatosEstModificados
	END


	/**************************# INSERTA LOS DATOS QUE VIENEN DEL XML A LA TABLA TEMPORAL #*********************/	
	EXEC sp_xml_preparedocument @iDocHandler OUTPUT,@XMLParam

		
		INSERT INTO #tbDatosEstModificados (cod_emp,		
											ind_DecRenta,	
											met_ret,		
											pto_gas,
											Cpto_deudas,
											per_car,
											deudas
											)

		SELECT *									
			FROM OPENXML (@iDocHandler,'/ROOT/camposModificadosDataosFinancierosHV',1) 
			WITH (		cod_emp			varchar(12) ,
						ind_DecRenta	char(1)  ,
						met_ret			smallint	 ,
						pto_gas			money		,
						Cpto_deudas		nvarchar(MAX) ,
						per_car			smallint	,
						deudas			bit				
				)
			

			EXEC sp_xml_removedocument @iDocHandler;


	IF @Opcion = 'CONSULTA'
	BEGIN

		SELECT	cod_emp,		--codigo empleado
				ind_DecRenta,	--declarante de rente
				met_ret,		--método retencion
				pto_gas,		--presupuesto mensual de gastos
				Cpto_deudas,	--concepto de deudas
				per_car,		--personas a cargo
				deudas,			--tiene deudas?
				'Aprobado' AS estado 

			FROM rhh_emplea A 
			WHERE A.cod_emp = @cod_Emp --'1012389184'
				AND A.cod_emp NOT IN (SELECT distinct cod_emp 
										FROM prt_portal_DatosFinancieros B 
										WHERE A.cod_emp=B.cod_emp )

		UNION ALL

		SELECT	cod_emp,		--codigo empleado
				ind_DecRenta,	--declarante de rente
				met_ret,		--método retencion
				pto_gas,		--presupuesto mensual de gastos
				Cpto_deudas,	--concepto de deudas
				per_car,		--personas a cargo
				deudas,			--tiene deudas?
			    IIF(EXISTS(SELECT cod_emp FROM  rhh_emplea WHERE cod_emp=@cod_Emp),'Pendiente','Nuevo') as estado
		
			FROM prt_portal_DatosFinancieros A 
			 WHERE cod_emp = @cod_Emp--'1018465875'
		END

	ELSE IF @Opcion='CONSULTAENTERP'
	BEGIN
			SELECT	cod_emp,	--codigo empleado
				ind_DecRenta,	--declarante de rente
				met_ret,		--método retencion
				pto_gas,		--presupuesto mensual de gastos
				Cpto_deudas,	--concepto de deudas
				per_car,		--personas a cargo
				deudas			--tiene deudas?

			FROM rhh_emplea A 
			WHERE A.cod_emp = @cod_Emp --'1012389184'
	END
	ELSE IF @Opcion = 'MODIFICACION'
	BEGIN


		/*Crea Tabla temporal para cargar los datos del XML*/
		IF OBJECT_ID('tempdb..#tbCompararegistro')  IS NULL
		BEGIN
			create table #tbCompararegistro
			(
				
				cod_emp				varchar(12) NULL,
				Descripcion			varchar(50) NULL,
				campo				varchar(50) NULL,
				valor_nuevo			varchar(max) NULL,
				Act_valor_actual	varchar(max) NULL,
			)
		END
		ELSE
		BEGIN
			delete #tbCompararegistro
		END

		Delete e
		FROM prt_portal_DatosFinancieros e
		INNER JOIN #tbDatosEstModificados tem ON e.cod_emp = tem.cod_emp  COLLATE DATABASE_DEFAULT 
												
											

		INSERT INTO prt_portal_datosfinancieros (cod_emp,		
												ind_DecRenta,	
												met_ret,		
												pto_gas,
												Cpto_deudas,
												per_car,
												deudas,
												cod_estado,
												tipo_cambio
												)
											
		
		select	cod_emp, ind_DecRenta, met_ret, pto_gas, Cpto_deudas, per_car, deudas,1 as estado ,2 as tipocambio  from #tbDatosEstModificados 


		/***  Se ejecuta el procedimiento que valida si hay cambios entre los registros  ***/
		

		INSERT INTO #tbCompararegistro
		EXEC sp_prt_CambiosHVDatosFinancieros @cod_emp ,'ModificacionRegistro'

		IF (SELECT COUNT(cod_emp) FROM #tbCompararegistro)=0
		BEGIN

			 --cuando no hay mas cambios lo deja como anulado en el historial
		    UPDATE prt_Portal_Historial_DatosFinancieros SET cod_estado=4,fec_proceso=GETDATE(),motivo='Anulado por el empleado' 
		    WHERE cod_emp=@cod_emp and cod_estado=1 --and campo <> 'dir_viv'

			DELETE e
			FROM prt_portal_DatosFinancieros e
			INNER JOIN #tbDatosEstModificados tem ON e.cod_emp = tem.cod_emp  COLLATE DATABASE_DEFAULT 
													
		END

	END
	
	
	
END

```
