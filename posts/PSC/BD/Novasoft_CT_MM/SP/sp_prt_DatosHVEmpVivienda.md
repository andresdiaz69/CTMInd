# Stored Procedure: sp_prt_DatosHVEmpVivienda

## Usa los objetos:
- [[gen_ciudad]]
- [[gen_deptos]]
- [[gen_paises]]
- [[GTH_TenenciaViv]]
- [[GTH_TipoViv]]
- [[P]]
- [[prt_Portal_Emp_Vivienda]]
- [[prt_Portal_Historial_Vivienda]]
- [[rhh_emplea]]
- [[rhh_vivienda]]
- [[sp_prt_CambiosHVViviendaEmp]]

```sql

-- =============================================
-- Author:		Jessy Tatiana Peralta Florez
-- Create date: 21-02-2023
-- Description:	Obtienen los datos de vivienda del empleado teniendo en cuenta los cambios que el empleado envio.


--exec sp_prt_DatosHVEmpVivienda @loginEmplea='slopezt6113',@Opcion='CONSULTA',@XMLParam=NULL,@dir_viv=' '

--SPA Estado autorizacion HV
--Modified by:		Alexander Vargas
--Modified date:	05/04/2023
--Description:		se agrega campo cod_estado en las opciones de Nuevo y modificacion
--				para que se guarde en el historial

--SRS2023 - 1104 Error por intercalacion en datos basicos
--Modified by:	Alexander Vargas
--Modifie date:	28/09/2023
--Descripction: se agrega collate al consultar campo en una tabla temporal

-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_DatosHVEmpVivienda] 
	@loginEmplea	NVARCHAR(20)='',
	@Opcion			NVARCHAR(30),
	@XMLParam		XML = NULL,

	@dir_viv		CHAR(40) =''
	
	
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
			[cod_emp]			char(12) NOT NULL,
			[dir_viv]			char(40) NOT NULL,
			[cod_pai]			char(3) NULL,
			[cod_dep]			char(2) NULL,
			[cod_ciu]			char(5) NULL,
			[tip_viv]			int NOT NULL,
			[tip_ten]			int NOT NULL,
			[are_tom]			float NULL,
			[are_com]			float NULL,
			[num_alc]			int NOT NULL,
			[noc_alc]			int NOT NULL,
			[ser_acu]			bit NOT NULL,
			[ser_ene]			bit NOT NULL,
			[ser_tel]			bit NOT NULL,
			[ser_alc]			bit NOT NULL,
			[ser_gad]			bit NOT NULL,
			[viv_act]			bit NOT NULL,
			[ser_int]			bit NOT NULL,
			[estrato]			int NULL,
			[cant_pers_convive] int NULL
		)
	END
	ELSE
	BEGIN
		delete #tbDatosEstModificados
	END


	/**************************# INSERTA LOS DATOS QUE VIENEN DEL XML A LA TABLA TEMPORAL #*********************/	
	EXEC sp_xml_preparedocument @iDocHandler OUTPUT,@XMLParam

		
		INSERT INTO #tbDatosEstModificados (cod_emp	
											,dir_viv
											,cod_pai 
											,cod_dep 
											,cod_ciu 
											,tip_viv
											,tip_ten
											,are_tom
											,are_com
											,num_alc
											,noc_alc
											,ser_acu
											,ser_ene
											,ser_tel
											,ser_alc
											,ser_gad
											,viv_act
											,ser_int
											,estrato
											,cant_pers_convive
											)

											
		SELECT *
			FROM OPENXML (@iDocHandler,'/ROOT/camposModificadosViviendaHV',1) 
			WITH (	cod_emp				char(12)
					,dir_viv			char(40)
					,cod_pai			char(3) 
					,cod_dep			char(2) 
					,cod_ciu			char(5) 
					,tip_viv			int 
					,tip_ten			int 
					,are_tom			float
					,are_com			float
					,num_alc			int
					,noc_alc			int
					,ser_acu			bit
					,ser_ene			bit
					,ser_tel			bit
					,ser_alc			bit
					,ser_gad			bit
					,viv_act			bit
					,ser_int			bit
					,estrato			int
					,cant_pers_convive	int
				)
			

			EXEC sp_xml_removedocument @iDocHandler;




	SELECT @cod_Emp = cod_emp 
	FROM rhh_emplea 
	WHERE RTRIM(login_portal) like @loginEmplea

	
--select '@cod_Emp'=@cod_Emp

	IF @Opcion = 'CONSULTA'
	BEGIN
	--declare @cod_Emp varchar(12) = '1018465875'

		SELECT	[cod_emp] --cod Empleado
				,[dir_viv] --Dirección Vivienda 
				,A.[cod_pai] --Cod Pais
				,P.[nom_pai] --Nombre Pais
				,A.[cod_dep] --Cod Depto
				,D.[nom_dep] --Nombre Depto
				,A.[cod_ciu] --Cod Ciudad
				,GC.[nom_ciu] --Nombre Ciudad
				,A.[tip_viv] --Tipo Vivienda
				,B.[des_tip] --Descripcion Tipo Vivienda
				,A.[tip_ten] --Tenencia clase vivienda 
				,C.[des_ten] --Descripcion Tenencia clase vivienda 
				
				,[are_tom] --Área Terreno (M)
				,[are_com] --Área Construida (M)
				,[num_alc] --Numero Alcobas
				,[noc_alc] --No Ocupantes por Alcoba
				,[ser_acu] --Ind Serv Acueducto
				,[ser_ene] --Ind Serv Energia
				,[ser_tel] --Ind Serv Telefono
				,[ser_alc] --Ind Serv Alcantarillado
				,[ser_gad] --Ind Serv GAS
				,[viv_act] --Ind Vivienda Actual
				,[ser_int] --Ind Serv Internet
				,[estrato] --Estatro
				,[cant_pers_convive] --Nro Personas que convive 
				,'Aprobado' AS estado 

			FROM rhh_vivienda A 
				INNER JOIN GTH_TipoViv B ON A.tip_viv = b.tip_viv
				INNER JOIN GTH_TenenciaViv C ON a.tip_ten = c.tip_ten

				INNER JOIN gen_paises P ON a.cod_pai = p.cod_pai
				INNER JOIN gen_deptos D ON a.cod_pai = D.cod_pai and a.cod_dep = D.cod_dep
				INNER JOIN gen_ciudad GC ON a.cod_pai = GC.cod_pai and a.cod_dep = GC.cod_dep and a.cod_ciu = GC.cod_ciu
				 
			WHERE A.cod_emp = @cod_Emp --'1018465875'
				AND A.cod_emp NOT IN (SELECT distinct cod_emp 
										FROM prt_Portal_Emp_Vivienda B 
										WHERE A.cod_emp=B.cod_emp AND A.dir_viv = B.dir_viv  )

		UNION ALL

		SELECT	 [cod_emp] --cod Empleado
				,[dir_viv] --Dirección Vivienda 
				,A.[cod_pai] --Cod Pais
				,P.[nom_pai] --Nombre Pais
				,A.[cod_dep] --Cod Depto
				,D.[nom_dep] --Nombre Depto
				,A.[cod_ciu] --Cod Ciudad
				,GC.[nom_ciu] --Nombre Ciudad
				,A.[tip_viv] --Tipo Vivienda
				,B.[des_tip] --Descripcion Tipo Vivienda
				,A.[tip_ten] --Tenencia clase vivienda 
				,C.[des_ten] --Descripcion Tenencia clase vivienda 
				,[are_tom] --Área Terreno (M)
				,[are_com] --Área Construida (M)
				,[num_alc] --Numero Alcobas
				,[noc_alc] --No Ocupantes por Alcoba
				,[ser_acu] --Ind Serv Acueducto
				,[ser_ene] --Ind Serv Energia
				,[ser_tel] --Ind Serv Telefono
				,[ser_alc] --Ind Serv Acueducto
				,[ser_gad] --Ind Serv Acueducto
				,[viv_act] --Ind Vivienda Actual
				,[ser_int] --Ind Serv Internet
				,[estrato] --Estatro
				,[cant_pers_convive] --Nro Personas que convive 
			    ,IIF(EXISTS(SELECT cod_emp FROM  rhh_vivienda 
							WHERE cod_emp = @cod_Emp AND dir_viv=A.dir_viv),'Pendiente','Nuevo') as estado
		
			FROM prt_Portal_Emp_Vivienda A 
				INNER JOIN GTH_TipoViv B ON A.tip_viv = b.tip_viv
				INNER JOIN GTH_TenenciaViv C ON a.tip_ten = c.tip_ten

				INNER JOIN gen_paises P ON a.cod_pai = p.cod_pai
				INNER JOIN gen_deptos D ON a.cod_pai = D.cod_pai and a.cod_dep = D.cod_dep
				INNER JOIN gen_ciudad GC ON a.cod_pai = GC.cod_pai and a.cod_dep = GC.cod_dep and a.cod_ciu = GC.cod_ciu

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
				valor_nuevo			varchar(150) NULL,
				Act_valor_actual	varchar(150) NULL,
			)
		END
		ELSE
		BEGIN
			delete #tbCompararegistro
		END


		/*Elimina e ingresa el registro q esta modificando*/

		Delete P
		FROM prt_Portal_Emp_Vivienda P
		INNER JOIN #tbDatosEstModificados tem ON P.cod_emp = tem.cod_emp  COLLATE DATABASE_DEFAULT 
												AND P.dir_viv = tem.dir_viv COLLATE DATABASE_DEFAULT
											

		INSERT INTO prt_Portal_Emp_Vivienda (cod_emp	
											,dir_viv
											,cod_pai 
											,cod_dep 
											,cod_ciu 
											,tip_viv
											,tip_ten
											,are_tom
											,are_com
											,num_alc
											,noc_alc
											,ser_acu
											,ser_ene
											,ser_tel
											,ser_alc
											,ser_gad
											,viv_act
											,ser_int
											,estrato
											,cant_pers_convive
											,cod_estado
											,tipo_cambio)
											
		
		SELECT	cod_emp	
											,dir_viv
											,cod_pai 
											,cod_dep 
											,cod_ciu 
											,tip_viv
											,tip_ten
											,are_tom
											,are_com
											,num_alc
											,noc_alc
											,ser_acu
											,ser_ene
											,ser_tel
											,ser_alc
											,ser_gad
											,viv_act
											,ser_int
											,estrato
											,cant_pers_convive 
											,1 as estado 
											,2 as tipocambio
		FROM #tbDatosEstModificados

		
		/***  Se ejecuta el procedimiento que valida si hay cambios entre los registros  ***/
		
	

		DECLARE @dir_vivModi	VARCHAR(40) 

		SELECT @dir_vivModi = dir_viv FROM #tbDatosEstModificados
		
	

		   SELECT @cod_Emp = cod_emp 
		   FROM rhh_emplea 
		   WHERE RTRIM(login_portal) like @loginEmplea

		INSERT INTO #tbCompararegistro
		EXEC sp_prt_CambiosHVViviendaEmp @cod_emp ,@dir_vivModi,'','ModificacionRegistro'

		--cuando no hay cambios borra el registro
		IF (SELECT count(cod_emp) FROM #tbCompararegistro)=0
		BEGIN

		    --cuando no hay mas cambios lo deja como anulado en el historial
		    UPDATE prt_Portal_Historial_Vivienda SET cod_estado=4,fec_proceso=GETDATE(),motivo='Anulado por el empleado' 
		    WHERE cod_emp=@cod_emp and dir_viv=@dir_vivModi and cod_estado=1 and campo <> 'dir_viv'

			DELETE P
			FROM prt_Portal_Emp_Vivienda P
			INNER JOIN #tbDatosEstModificados tem ON P.cod_emp = tem.cod_emp  COLLATE DATABASE_DEFAULT 
													AND P.dir_viv = tem.dir_viv COLLATE DATABASE_DEFAULT 
													AND P.dir_viv<>'dir_viv'
		END
		ELSE
		BEGIN
			 --Para anular solo el campo que se deja igual, cuando hay varios campos modificados
		    UPDATE prt_Portal_Historial_Vivienda SET cod_estado=4,fec_proceso=GETDATE(),motivo='Anulado por el empleado' 
		    WHERE cod_emp=@cod_emp and dir_viv=@dir_vivModi and cod_estado=1 and campo <> 'dir_viv' 
		    AND campo NOT IN (SELECT campo COLLATE DATABASE_DEFAULT FROM #tbCompararegistro)

		END
		


	END
	
	ELSE IF @Opcion = 'INGRESANUEVO'
	BEGIN
		
		SELECT TOP 1 @cod_emp=cod_emp,@dir_viv=dir_viv FROM #tbDatosEstModificados

		DECLARE @tipo_cambio INT

		--@tipo_cambio:1-Nuevo, 2-Modificación
		IF EXISTS(SELECT * FROM rhh_vivienda WHERE cod_emp=@cod_Emp AND dir_viv=@dir_viv)
		    BEGIN
			 SET @tipo_cambio=2
		    END
		ELSE
		    BEGIN
			 SET @tipo_cambio=1
		    END

		INSERT INTO prt_Portal_Emp_Vivienda (cod_emp	
											,dir_viv
											,cod_pai 
											,cod_dep 
											,cod_ciu 
											,tip_viv
											,tip_ten
											,are_tom
											,are_com
											,num_alc
											,noc_alc
											,ser_acu
											,ser_ene
											,ser_tel
											,ser_alc
											,ser_gad
											,viv_act
											,ser_int
											,estrato
											,cant_pers_convive
											,cod_estado
											,tipo_cambio)
											
		
		SELECT	cod_emp	
											,dir_viv
											,cod_pai 
											,cod_dep 
											,cod_ciu 
											,tip_viv
											,tip_ten
											,are_tom
											,are_com
											,num_alc
											,noc_alc
											,ser_acu
											,ser_ene
											,ser_tel
											,ser_alc
											,ser_gad
											,viv_act
											,ser_int
											,estrato
											,cant_pers_convive 
											,1 as estado 
											,@tipo_cambio as tipoCambio
		FROM #tbDatosEstModificados

		--regresa tabla del estudio guardado
		select cod_emp,dir_viv from #tbDatosEstModificados

	END
	
	
	ELSE IF @OPCION = 'ELIMINAREGISTRO'
	BEGIN
		--al borar el registro marca en el historial como rechazo  
		UPDATE prt_Portal_Historial_Vivienda SET cod_estado=4,fec_proceso=GETDATE(),motivo='Anulado por el empleado' 
		WHERE cod_emp=@cod_emp and dir_viv=@dir_viv and cod_estado=1

		DELETE FROM prt_Portal_Emp_Vivienda 
		WHERE cod_emp=@cod_emp and dir_viv=@dir_viv
	END
	
	ELSE IF @OPCION = 'VIVIENDAACTUAL'
	BEGIN

		SELECT cod_emp, dir_res,pai_res,dpt_res,ciu_res FROM rhh_emplea where cod_emp=@cod_Emp

	END
		
	
END


```
