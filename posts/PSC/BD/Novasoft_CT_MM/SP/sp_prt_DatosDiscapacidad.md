# Stored Procedure: sp_prt_DatosDiscapacidad

## Usa los objetos:
- [[e]]
- [[GTH_Discapacidades]]
- [[GTH_DiscapEmplea]]
- [[prt_portal_DiscapEmplea]]
- [[prt_Portal_Historial_Discapacidades]]
- [[rhh_emplea]]
- [[sp_prt_CambiosHVDiscapacidades]]

```sql

-- =============================================
-- Author:		Jessy Tatiana Peralta Florez
-- Create date: 21-02-2023
-- Description:	Obtienen los datos de estudios del empleado teniendo en cuenta los cambios que el empleado envio.

--exec sp_prt_DatosDiscapacidad 'slopezt6113','CONSULTA'


--SPA Estado autorizacion HV
--Modified by:		Alexander Vargas
--Modified date:	28/04/2023
--Description:		en modificación y nuevo se agrega estado y tipo de cambio. En la 
--				eliminación se envia el estado de anulado

--SPA Estado autorizacion HV
--Modified by:		Alexander Vargas
--Modified date:	15/06/2023
--Description: en la tabla #tbCompararegistro se aumenta el tamaño de los 
--campos valor_nuevo y Act_valor_actual a 255
-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_DatosDiscapacidad] 
	@loginEmplea	NVARCHAR(20)='',
	@Opcion			NVARCHAR(30),
	@XMLParam		XML = NULL,

	@cod_disc		CHAR(5) =''
	
	
--WITH ENCRYPTION
AS
BEGIN

	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	--VARIABLES XML
	DECLARE @iDocHandler	INT,
			@cod_Emp		CHAR(12) ='';
	
	
	/*Crea Tabla temporal para cargar los datos del XML*/
	IF OBJECT_ID('tempdb..#tbDatosEstModificados')  IS NULL
	BEGIN
		create table #tbDatosEstModificados
		(
			cod_emp			varchar(12) NOT NULL,
			cod_disc		varchar(5) NOT NULL,
			req_disc		varchar(max) NULL
		)
	END
	ELSE
	BEGIN
		delete #tbDatosEstModificados
	END


	/**************************# INSERTA LOS DATOS QUE VIENEN DEL XML A LA TABLA TEMPORAL #*********************/	
	EXEC sp_xml_preparedocument @iDocHandler OUTPUT,@XMLParam

		
		INSERT INTO #tbDatosEstModificados (cod_emp	,
											cod_disc,
											req_disc
											)

											
		SELECT *
			FROM OPENXML (@iDocHandler,'/ROOT/camposModificadosDiscapacidadHV',1) 
			WITH (	cod_emp			varchar(12),
					cod_disc		varchar(5) ,
					req_disc		varchar(max)
				)
			

			EXEC sp_xml_removedocument @iDocHandler;




	SELECT @cod_Emp = cod_emp 
	FROM rhh_emplea 
	WHERE RTRIM(login_portal) like @loginEmplea



	IF @Opcion = 'CONSULTA'
	BEGIN
	--declare @cod_Emp varchar(12) = '1018465875'

		SELECT	/*0*/ A.cod_emp, --codigo empleado
				/*1*/ A.cod_disc, --Codigo Discapacidad
				/*2*/ D.des_disc, --Descripcion Discapacidad
				/*3*/ A.req_disc, --Observacion Discapacidad
				/*4*/ 'Aprobado' AS estado 

			FROM GTH_DiscapEmplea A 
				 INNER JOIN GTH_Discapacidades D ON a.cod_disc = d.cod_disc
			WHERE A.cod_emp = @cod_Emp --'1018465875'
				AND A.cod_emp NOT IN (SELECT distinct cod_emp 
										FROM prt_portal_DiscapEmplea B 
										WHERE A.cod_emp=B.cod_emp and a.cod_disc = b.cod_disc )

		UNION ALL

		SELECT	/*0*/ A.cod_emp, --codigo empleado
				/*1*/ A.cod_disc, --Codigo Discapacidad
				/*2*/ D.des_disc, --Descripcion Discapacidad
				/*3*/ A.req_disc, --Observacion Discapacidad
			   /*27*/ IIF(EXISTS(SELECT cod_emp FROM  GTH_DiscapEmplea WHERE cod_emp=@cod_Emp AND cod_disc=A.cod_disc),'Pendiente','Nuevo') as estado
		
			FROM prt_portal_DiscapEmplea A 
				INNER JOIN GTH_Discapacidades D ON a.cod_disc = d.cod_disc
			 WHERE cod_emp = @cod_Emp--'1018465875'
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
				valor_nuevo			varchar(255) NULL,
				Act_valor_actual	varchar(255) NULL,
			)
		END
		ELSE
		BEGIN
			delete #tbCompararegistro
		END

	
		/*Elimina e ingresa el registro q esta modificando*/

		Delete e
		FROM prt_portal_DiscapEmplea e
		INNER JOIN #tbDatosEstModificados tem ON e.cod_emp = tem.cod_emp  COLLATE DATABASE_DEFAULT 
												AND e.cod_disc = tem.cod_disc COLLATE DATABASE_DEFAULT
											

		INSERT INTO prt_portal_DiscapEmplea (cod_emp,
											cod_disc,
											req_disc,
											cod_estado,
											tipo_cambio)
		select	cod_emp,cod_disc,req_disc,1 as estado,2 as tipocambio from #tbDatosEstModificados
		

		/***  Se ejecuta el procedimiento que valida si hay cambios entre los registros  ***/
		
		DECLARE @cod_discMod	CHAR(5)

		SELECT @cod_discMod=cod_disc FROM #tbDatosEstModificados

		INSERT INTO #tbCompararegistro
		EXEC sp_prt_CambiosHVDiscapacidades @cod_emp ,@cod_discMod,'','ModificacionRegistro'

		IF (SELECT COUNT(cod_emp) FROM #tbCompararegistro)=0 AND EXISTS(SELECT cod_emp FROM  GTH_DiscapEmplea WHERE cod_emp=@cod_Emp AND cod_disc=@cod_discMod)
		BEGIN

			 --cuando no hay mas cambios lo deja como anulado en el historial
		    UPDATE prt_Portal_Historial_Discapacidades SET cod_estado=4,fec_proceso=GETDATE(),motivo='Anulado por el empleado' 
		    WHERE cod_emp=@cod_emp and cod_disc=@cod_discMod and cod_estado=1 and campo <> 'cod_disc'

			DELETE e
			FROM prt_portal_DiscapEmplea e
			INNER JOIN #tbDatosEstModificados tem ON e.cod_emp = tem.cod_emp  COLLATE DATABASE_DEFAULT 
													AND e.cod_disc = tem.cod_disc COLLATE DATABASE_DEFAULT
		END
		



	END
	
	ELSE IF @Opcion = 'INGRESANUEVO'
	BEGIN

		DECLARE @tipo_cambio INT

		--@tipo_cambio:1-Nuevo, 2-Modificación
		IF EXISTS(SELECT * FROM prt_portal_DiscapEmplea WHERE cod_emp=@cod_Emp AND cod_disc=@cod_disc)
		    BEGIN
			 SET @tipo_cambio=2
		    END
		ELSE
		    BEGIN
			 SET @tipo_cambio=1
		    END
		
		
		INSERT INTO prt_portal_DiscapEmplea (cod_emp,
											cod_disc,
											req_disc
											,cod_estado
											,tipo_cambio)
											
		select	cod_emp,
				cod_disc,
				req_disc,
				1 as estado,
				@tipo_cambio as tipoCambio

		from #tbDatosEstModificados

		--regresa tabla del estudio guardado
		select cod_emp,cod_disc, req_disc from #tbDatosEstModificados

	END
	
	

	ELSE IF @OPCION = 'ELIMINADISCAPACIDAD'
	BEGIN

		--al borar el registro marca en el historial como rechazo  
		UPDATE prt_Portal_Historial_Discapacidades SET cod_estado=4,fec_proceso=GETDATE(),motivo='Anulado por el empleado' 
		WHERE cod_emp=@cod_emp and cod_disc=@cod_disc and cod_estado=1

		DELETE FROM prt_portal_DiscapEmplea WHERE cod_emp=@cod_emp and cod_disc=@cod_disc
	END
	
		
	
END

```
