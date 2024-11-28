# Stored Procedure: sp_prt_CreaLoginRol

## Usa los objetos:
- [[EC]]
- [[fn_prt_CreaLoginPortal]]
- [[gth_portal_configuracion]]
- [[PRT_vargen]]

```sql




-- =============================================
-- Author:  Jessy Tatiana Peralta
-- Create date: Septiembre 29 2020
-- Description: Crea los login que vienen del archivo XML que el usuario selecciono para la creacion.

-- Modified: 29 Octubre 2020
-- Modified by: Jessy Tatiana Peralta
-- Description: Se modifica, la validacion del segundo apellido, para los empleados que no tenga segundo apellido no quede un espacio en blanco


--SPA2021-0645 dir y tel candidatos
-- Modified:	07/01/2022
-- Modified by: Alexander Vargas
-- Description: Se agregan los parametros @telcand y @dircand 
--				para registrar el Teléfono y la dirección del candidato
--				en la tabla gen_tercerosportal 

--SPA2022 - 0064 Ciudad en creacion candidato sea una lista
-- Modified:	30/06/2022
-- Modified by: Alexander Vargas
-- Description: Se agregan los parámetro @pais, @depto y @ciudad para 
--				registrar esos valores en la tabla gen_tercerosportal

-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_CreaLoginRol]
	 -- Add the parameters for the stored procedure here
	 @XMLParam		XML = NULL,
	 @rol			VARCHAR(2),
	 @telcand		VARCHAR(20)=NULL,
	 @dircand		VARCHAR(100)=NULL,
	 @pais			VARCHAR(5)=NULL,
	 @depto			VARCHAR(5)=NULL,
	 @ciudad		VARCHAR(5)=NULL

	--WITH ENCRYPTION
	AS
	BEGIN

---VARIABLES XML
	DECLARE @iDocHandler	INT;

		DECLARE @cCadena NVARCHAR(MAX);
		DECLARE @cCadena2 NVARCHAR(MAX);
		DECLARE @ParmDefinition NVARCHAR(MAX)
		DECLARE @cGen_TercerosPortal SYSNAME
		DECLARE @cGen_usuariosPortal SYSNAME
		DECLARE @cGen_usuariosPortalRoll SYSNAME
		DECLARE @cError NVARCHAR(4000);
		--DECLARE @CadenaActualiza VARCHAR(50);

		DECLARE 
				@contMax	INT,
				@contMin	INT,
				@cod_emp	VARCHAR(20),
				@login		VARCHAR(60),
--Variables para llevar a la funcion 

				@ap1_usu		VARCHAR(50)='%',
				@nom_usu		VARCHAR(50)='%',
				@ap2_usu		VARCHAR(100)='%',

--variable para crear consecutivo en el indicador del usuarios de HDK, igual a como esta en Enterprise.
				@nId_Usuario	INT,
				@nId_Cliente    INT;
		
		SELECT @nId_Cliente=val_var FROM PRT_vargen WHERE num_var='17'
		--*****************************************
		--Se agrega la opción para manejo de servidor vinculado
		--Permite realizar consultas entre 2 bases en
		--diferentes servidores

		DECLARE @Serv VARCHAR(50)= NULL
		DECLARE @BD		VARCHAR(50)= NULL
		DECLARE @ServBD		VARCHAR(100)= NULL

		SELECT @Serv = Servidor FROM gth_portal_configuracion
		SELECT @BD = BaseDatos FROM gth_portal_configuracion
		
		SET @ServBD = QUOTENAME(@Serv) +'.'+QUOTENAME(@BD)+'.[dbo].'
		--*****************************************
		

		SET @cGen_TercerosPortal = @ServBD + 'gen_tercerosPortal'
		SET @cGen_usuariosPortal = @ServBD + 'gen_usuarios'
		SET @cGen_usuariosPortalRoll = @ServBD + 'gen_usuario_rol'
	

		IF OBJECT_ID('tempdb..#tbcontrasena')  IS NULL
			BEGIN
				create table #tbcontrasena
				(descricion varchar (20))
			END
			
		IF OBJECT_ID('tempdb..#tbEmpleados')  IS NULL
		BEGIN
			create table #tbEmpleados
			(
				[contador]	[INT] NOT NULL,
				[cod_emp]	[char](12) NOT NULL,
				[log_usu]	[varchar](60) NOT NULL,
				[pwd_usu]	[nvarchar](500) NOT NULL,
				[nom_usu]	[varchar](50) NOT NULL,
				[ap1_usu]	[varchar](50) NOT NULL,
				[ap2_usu]	[varchar](50) NOT NULL,
				[email_usu]	[varchar](150) NOT NULL,
				[fec_ing]	[datetime] NOT NULL,
				--[fec_fin] [datetime] NULL DEFAULT ((1)),
				[num_ide] [char](20) NOT NULL,
				PRIMARY KEY CLUSTERED 
				(
					[num_ide] ASC
				)WITH (IGNORE_DUP_KEY = OFF)
				)
		END
		ELSE
		BEGIN
			delete #tbEmpleados
		END

		IF OBJECT_ID('tempdb..#tbEnvioCorreos')  IS NULL
		BEGIN
			SELECT * INTO #tbEnvioCorreos from #tbEmpleados
		END
		ELSE
		BEGIN
			delete #tbEnvioCorreos
		END
		
/**************************# INSERTA LOS DATOS QUE VIENEN DEL XML A LA TABLA TEMPORAL #*********************/	
	EXEC sp_xml_preparedocument @iDocHandler OUTPUT,@XMLParam
		
		INSERT INTO #tbEmpleados (contador,cod_emp,log_usu,pwd_usu,nom_usu,ap1_usu,ap2_usu,email_usu,fec_ing,num_ide)
		SELECT ROW_NUMBER()OVER (ORDER BY num_ide) contador, cod_emp, log_usu, pwd_usu,nom_usu,ap1_usu,ap2_usu,email_usu,fec_ing,num_ide
			FROM OPENXML (@iDocHandler,'/ROOT/CreaLogin',1) WITH (	[contador] [INT],
																	[cod_emp] [char](12),
																	[log_usu] [varchar](60),
																	[pwd_usu] [nvarchar](500),
																	[nom_usu] [varchar](50),
																	[ap1_usu] [varchar](50),
																	[ap2_usu] [varchar](50),
																	[email_usu]  [varchar](150),
																	[fec_ing] [datetime],
																	[num_ide] [char](20));

			EXEC sp_xml_removedocument @iDocHandler;
		
/**************************# fin INSERTA LOS DATOS QUE VIENEN DEL XML A LA TABLA TEMPORAL #*********************/			
		


		IF EXISTS (SELECT * FROM #tbEmpleados)
		BEGIN
			SELECT @contMax = MAX(contador) FROM #tbEmpleados
			SET @contMin = 1
			WHILE @contMin <= @contMax
			BEGIN 
				
				SELECT	@cod_emp=ltrim(rtrim(cod_emp)), 
						@ap1_usu=ltrim(rtrim(ap1_usu)),
						@nom_usu=ltrim(rtrim(nom_usu)),
						@ap2_usu=ltrim(rtrim(ap2_usu)),
						@login=ltrim(rtrim(log_usu))
				FROM #tbEmpleados WHERE contador = @contMin;

				SELECT @nId_Usuario = IDENT_CURRENT('HDK_USUARIO');
				IF NOT EXISTS( SELECT IDENT_CURRENT('HDK_USUARIO') )
				BEGIN
					 SET @nId_Usuario = 1;
				END;
					 ELSE
				BEGIN
					 SELECT @nId_Usuario = @nId_Usuario + 1;
				END;	
				

				
				IF (@login = 'NoLogin')	--El login llega con esta palabra cuando esta vacio
				BEGIN
					declare @loginValidacion varchar(60);
					SET @login = convert(varchar,(round(RAND() * 10000,0)))

					SELECT @loginValidacion = [dbo].[fn_prt_CreaLoginPortal] (@cod_emp,@ap1_usu,@login,@nom_usu,@ap2_usu)
										
					WHILE PATINDEX('%[^a-zA-Z0-9 ]%', @loginValidacion)>0
					BEGIN 
						select @loginValidacion = stuff(@loginValidacion,PATINDEX('%[^a-zA-Z0-9 ]%', @loginValidacion),1,'')
					END

					IF @loginValidacion <> @cod_emp
					BEGIN
						SET @login = @loginValidacion + @login
					END
					ELSE
					BEGIN
						SET @login = @loginValidacion
					END
					update #tbEmpleados set log_usu = RTRIM(@login) WHERE contador=@contMin
					
				END

				
				SET @cCadena =
					N'
					

					IF NOT EXISTS (SELECT distinct(COD_EMP) FROM GEN_USUARIOS WHERE COD_EMP = '+QUOTENAME(@cod_emp,char(39)) +') 
					BEGIN
						
						INSERT INTO '+@cGen_TercerosPortal+' (cod_ter,nom_ter,ap1_ter,ap2_ter,email_ter,cod_cliente)
								SELECT cod_emp,nom_usu,ap1_usu,ap2_usu,email_usu,num_ide 
								FROM #tbEmpleados WHERE cod_emp = '+QUOTENAME(@cod_emp,char(39)) +';

						INSERT INTO '+@cGen_usuariosPortal+' (num_ide,log_usu,pwd_usu,fec_sol) 
							SELECT cod_emp,log_usu,pwd_usu,getdate() 
							FROM #tbEmpleados WHERE cod_emp = '+QUOTENAME(@cod_emp,char(39)) +';

						INSERT INTO  '+@cGen_usuariosPortalRoll+' (num_ide, cod_rol, fec_ini, fec_fin, ind_act, log_usu)
						SELECT cod_emp,' + @rol + ', fec_ing, ''20500101'', 1, log_usu FROM #tbEmpleados WHERE cod_emp = '+QUOTENAME(@cod_emp,char(39)) +';
						
						INSERT INTO gen_usuarios (cod_emp, log_usu, email_usu, fec_sol) 
							SELECT cod_emp,log_usu,email_usu,getdate()
							FROM #tbEmpleados WHERE cod_emp = '+QUOTENAME(@cod_emp,char(39)) +';

						UPDATE e set e.login_portal = te.log_usu
						FROM rhh_emplea e
						INNER JOIN #tbEmpleados te ON e.cod_emp = te.cod_emp COLLATE DATABASE_DEFAULT
						WHERE e.cod_emp = '+QUOTENAME(@cod_emp,char(39)) +';
						
						IF '+@rol+'=14
						BEGIN
							INSERT INTO Hdk_Usuario( Usuario,
												  Nombre_Usuario,
												  email_Usuario,
												  Tel_Contacto
												)
							SELECT te.log_usu,CONCAT(te.nom_usu ,'' '',te.ap1_usu,'' '',te.ap2_usu) ,te.email_usu,e.tel_res
								FROM #tbEmpleados te
								INNER JOIN RHH_EMPLEA e ON te.cod_emp = e.cod_emp COLLATE DATABASE_DEFAULT
								WHERE te.cod_emp = '+QUOTENAME(@cod_emp,char(39)) +'
								;

							INSERT INTO Hdk_Usuario_Cliente( Id_Usuario,
														Id_ClienteLic
													   )
							VALUES (@nId_UsuarioParam,@nId_ClienteParam)

						END
						
						
					END
					ELSE IF NOT EXISTS (SELECT * FROM '+@cGen_usuariosPortalRoll+' WHERE num_ide ='+QUOTENAME(@cod_emp,char(39)) +' and cod_rol=' + @rol + ')
					BEGIN
						INSERT INTO  '+@cGen_usuariosPortalRoll+' (num_ide, cod_rol, fec_ini, fec_fin, ind_act, log_usu)
								SELECT cod_emp,' + @rol + ', fec_ing, ''20500101'', 1,log_usu  FROM #tbEmpleados WHERE cod_emp = '+QUOTENAME(@cod_emp,char(39)) +';
					
						
						UPDATE e set e.login_portal = te.log_usu
						FROM rhh_emplea e
						INNER JOIN #tbEmpleados te ON e.cod_emp = te.cod_emp COLLATE DATABASE_DEFAULT
						WHERE e.cod_emp = '+QUOTENAME(@cod_emp,char(39)) +';

						IF '+@rol+'=14
						BEGIN
							INSERT INTO Hdk_Usuario( Usuario,
												  Nombre_Usuario,
												  email_Usuario,
												  Tel_Contacto
												)
							SELECT te.log_usu,CONCAT(te.nom_usu ,'' '',te.ap1_usu,'' '',te.ap2_usu) ,te.email_usu,e.tel_res
								FROM #tbEmpleados te
								INNER JOIN RHH_EMPLEA e ON te.cod_emp = e.cod_emp COLLATE DATABASE_DEFAULT
								WHERE te.cod_emp = '+QUOTENAME(@cod_emp,char(39)) +'
								;

							INSERT INTO Hdk_Usuario_Cliente( Id_Usuario,
														Id_ClienteLic
													   )
							VALUES (@nId_UsuarioParam,@nId_ClienteParam)

						END

						DELETE #tbcontrasena

						INSERT INTO #tbcontrasena VALUES (''contrasena'')
						

					END
					
					'
			--select @cCadena
			--Exec sp_executesql @cCadena;
			SET @ParmDefinition = N'@nId_UsuarioParam int,@nId_ClienteParam int';
			EXECUTE sp_executesql @cCadena, @ParmDefinition,  
                      @nId_UsuarioParam = @nId_Usuario, @nId_ClienteParam=@nId_Cliente;  

			--Para llenar teléfono y dirección del candidato
			IF @rol='5'
			BEGIN
				SET @cCadena2='UPDATE ' + @cGen_TercerosPortal + ' SET tel_ter=' + QUOTENAME(@telcand,char(39)) + 
							', dir_ter=' + QUOTENAME(@dircand,char(39)) + 
							', pais_ter=' + QUOTENAME(@pais,char(39)) + 
							', depto_ter=' + QUOTENAME(@depto,char(39)) + 
							', ciu_ter=' + QUOTENAME(@ciudad,char(39)) + 
							' WHERE cod_ter=' + QUOTENAME(@cod_emp,char(39))
			END

			EXEC (@cCadena2)


				IF OBJECT_ID('tempdb..#tbcontrasena') IS NOT NULL
				BEGIN
				
					IF ((SELECT * FROM #tbcontrasena )='contrasena')
					BEGIN
						UPDATE EC SET pwd_usu= 'Contrasena'
						FROM  #tbEmpleados EC
						WHERE contador=@contMin

						DELETE #tbcontrasena
					END
				END
 

				INSERT INTO #tbEnvioCorreos
				SELECT [contador],[cod_emp],[log_usu],[pwd_usu],[nom_usu],[ap1_usu],[ap2_usu],[email_usu],[fec_ing],[num_ide] FROM #tbEmpleados
				WHERE contador = @contMin


				SET @contMin = @contMin+1

			END
			
		SELECT [cod_emp],[log_usu],[pwd_usu],[nom_usu],[ap1_usu],[ap2_usu],[email_usu],[fec_ing],[num_ide] FROM #tbEnvioCorreos

		END
		
END

```
