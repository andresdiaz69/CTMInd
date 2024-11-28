# Stored Procedure: PA_Portal_CreaUsuarios_Portales_ERP

## Usa los objetos:
- [[cie_familia]]
- [[cxc_cliente]]
- [[cxp_provee]]
- [[gen_usuarios]]
- [[Server_vinculado]]
- [[vtu_gth_usuariosportal]]

```sql

-- =============================================
-- Author:  Alexander Vargas
-- Create date: 10 Mayo 2018
-- Description: Crea los usuarios para portal cliente ERP que vienen en la tabla @t_usuariosportal en el portal
-- Modificado: Jessy Peralta, 05-10-2019; Cambio total de la estructura en las tablas y se agrega los insert a cada una de ellas.

--SRS2023 - 0011 Tamanio variable server vinculado
--Modified by:		Alexander Vargas
--Modified date:	16/01/2023
--Description:		Se aumenta el tamaño de la variable serv_vinculado a 50 caracteres
-- =============================================

CREATE PROCEDURE [dbo].[PA_Portal_CreaUsuarios_Portales_ERP]
 -- Add the parameters for the stored procedure here
 @cNomBDatos SYSNAME = 'Portal_Web',
 @rolPortal VARCHAR(2) ='',
 @t_usuariosportal vtu_gth_usuariosportal READONLY
--WITH ENCRYPTION
AS
BEGIN

SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

	DECLARE @cCadena NVARCHAR(MAX);
	DECLARE @ParmDefinition NVARCHAR(MAX)
	DECLARE @cTableGenUsuarios SYSNAME
	DECLARE @cTableGenTerceros SYSNAME
	DECLARE @cTableGenUsuariosRol SYSNAME
	DECLARE @cError NVARCHAR(4000);
	DECLARE @CadenaActualiza VARCHAR(50);

	DECLARE @cGen_TercerosPortal SYSNAME
	DECLARE @cGen_usuariosPortal SYSNAME
	DECLARE @cGen_usuariosPortalRoll SYSNAME

	 	DECLARE @CADENA NVARCHAR(1000)

	--*****************************************
	--Se agrega la opción para manejo de servidor vinculado
	--Permite realizar consultas entre 2 bases en
	--diferentes servidores

	DECLARE @serv_vinculado VARCHAR(50)= NULL

	SELECT @serv_vinculado= server FROM Server_vinculado

	IF(@serv_vinculado IS NULL OR @serv_vinculado='' )
	BEGIN
		SET @serv_vinculado=@@SERVERNAME
	END

	--*****************************************

		SET @cGen_TercerosPortal = QUOTENAME(@serv_vinculado) + '.' + QUOTENAME(@cNomBDatos) + '.dbo.gen_tercerosPortal'
		SET @cGen_usuariosPortal = QUOTENAME(@serv_vinculado) + '.' + QUOTENAME(@cNomBDatos) + '.dbo.gen_usuarios'
		SET @cGen_usuariosPortalRoll = QUOTENAME(@serv_vinculado) + '.' + QUOTENAME(@cNomBDatos) + '.dbo.gen_usuario_rol'

		--SELECT * FROM @t_usuariosportal	
		SET @cCadena = N' IF NOT EXISTS (SELECT * FROM GEN_USUARIOS WHERE COD_EMP in (SELECT num_ide FROM @t_usuPort) ) 
						BEGIN ' 
		SET @cCadena += N' INSERT INTO ' + @cGen_TercerosPortal + N' (cod_ter,nom_ter,ap1_ter,ap2_ter,email_ter,cod_cliente) SELECT num_ide,nom_usu,ap1_usu, ap2_usu, email_usu,num_ide FROM @t_usuPort '
	
		SET @cCadena += N'INSERT INTO ' + @cGen_usuariosPortal + N' (num_ide,log_usu,pwd_usu,fec_sol) SELECT num_ide,log_usu,pwd_usu,getdate() FROM @t_usuPort '

		SET @cCadena += N' INSERT INTO gen_usuarios (cod_emp, log_usu, email_usu, fec_sol) SELECT num_ide,log_usu, email_usu,getdate() FROM @t_usuPort '

		SET @cCadena += N' END 
						INSERT INTO ' + @cGen_usuariosPortalRoll + ' (num_ide, cod_rol, fec_ini, fec_fin, ind_act,log_usu) SELECT num_ide,' + @rolPortal + ', fec_ini, fec_fin, 1, log_usu FROM @t_usuPort '

		SET @ParmDefinition = N'@t_usuPort vtu_gth_usuariosportal READONLY'

--SELECT @cCadena
		EXECUTE	sp_executesql @cCadena, @ParmDefinition, @t_usuPort = @t_usuariosportal;


	--Para usuarios portal clientes ERP
	IF @rolPortal=7
	BEGIN
		UPDATE cxc_cliente SET log_portal=usu.log_usu FROM cxc_cliente cli INNER JOIN gen_usuarios usu ON cli.cod_cli=usu.cod_emp
	END

	--Para usuarios portal proveedores ERP
	IF @rolPortal=9
	BEGIN
		UPDATE cxp_provee SET log_portal=usu.log_usu FROM cxp_provee prov INNER JOIN gen_usuarios usu ON prov.provee=usu.cod_emp
	END

	--Para usuarios portal proveedores ERP
	IF @rolPortal=10
	BEGIN
		UPDATE cie_familia SET log_portal=usu.log_usu FROM cie_familia fam INNER JOIN gen_usuarios usu ON fam.cod_fam=usu.cod_emp
	END

	--Para usuarios portal clientes BPO
	IF @rolPortal=4
	BEGIN
		UPDATE cxc_cliente SET log_portal=usu.log_usu FROM cxc_cliente cli INNER JOIN gen_usuarios usu ON cli.cod_cli=usu.cod_emp
	END

	--select *  FROM cxc_cliente cli INNER JOIN gen_usuarios usu ON cli.cod_cli=usu.cod_emp

	--BEGIN TRANSACTION
	--BEGIN TRY
	--	EXECUTE	sp_executesql @cCadena, @ParmDefinition, @t_usuPort = @t_usuariosportal;
		
	--	COMMIT TRANSACTION 
	--END TRY
	--BEGIN CATCH
	--	ROLLBACK TRANSACTION
	--	SET @cError = ERROR_MESSAGE();
	--	RAISERROR(@cError,18,1)
	--END CATCH
END

```
