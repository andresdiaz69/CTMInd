# Stored Procedure: rs_nom_nom1580_P

## Usa los objetos:
- [[gth_portal_configuracion]]
- [[Server_vinculado]]

```sql



-- ========================================================
-- Author:	JAIME DAVID BERNAL VILLARRAGA	
-- Create date: DIC 10th 2018
-- Description:	Listado de Usuarios Creados en Portal
-- Modify : Jessy Tatiana Peralta
-- Date: 13-07-2021

--SRS2023 - 0011 Tamanio variable server vinculado
--Modified by:		Alexander Vargas
--Modified date:	16/01/2023
--Description:		Se aumenta el tamaño de la variable serv_vinculado a 50 caracteres
-- ========================================================
--exec Rs_nom_nom1580_p '%', '%', '%', '1'
CREATE PROCEDURE [dbo].[rs_nom_nom1580_P] 
	@num_ide	VARCHAR (15),
	@cod_cia	CHAR(3),
	@cod_conv	VARCHAR(15),
	@ind_act	CHAR (1)

--EXEC rs_nom_nom1580_P '1010131071','01','0','1'

--WITH ENCRYPTION

AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;
	
	--*****************************************
       --Se agrega la opción para manejo de servidor vinculado
       --Permite realizar consultas entre 2 bases en
       --diferentes servidores

       DECLARE @serv_vinculado VARCHAR(50)= NULL
	   BEGIN
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Server_vinculado]') AND type in (N'U'))

       SELECT @serv_vinculado= server FROM Server_vinculado

      IF(@serv_vinculado IS NULL OR @serv_vinculado='' )
       BEGIN
             SET @serv_vinculado=@@SERVERNAME
       END
   ELSE 
			SET @serv_vinculado=@@SERVERNAME
END
       --*****************************************

	DECLARE @Tabla Table
	(
		cod_emp		CHAR(12),
		Nombres		VARCHAR(300),
		num_ide		CHAR(20),
		e_mail		VARCHAR(100),
		cod_cia		CHAR(3),
		nom_cia		VARCHAR(200),
		cod_conv	VARCHAR(15),
		nom_conv	VARCHAR(100),
		cod_rol		SMALLINT,
		nom_rol		CHAR (30),
		ind_act		BIT,
		des_ind		CHAR (10),
		log_usu		VARCHAR(60),
		fec_ini		DATETIME
	)

	DECLARE @BaseDatos VARCHAR(50);

	SELECT @BaseDatos = BaseDatos FROM gth_portal_configuracion

	DECLARE @cadena NVARCHAR(MAX);

	SELECT @cadena = 'SELECT Emplea.cod_emp, RTRIM(Emplea.nom_emp)+'' ''+RTRIM(Emplea.ap1_emp)+'' ''+RTRIM(Emplea.ap2_emp),' 
	SELECT @cadena = @cadena + 'Emplea.num_ide, Emplea.e_mail, Emplea.cod_cia, '
	SELECT @cadena = @cadena + 'Compania.nom_cia, Conv.cod_conv, Conv.nom_conv, '
	SELECT @cadena = @cadena + 'Gen_Usu_Rol.cod_rol, Gen_Rol.nom_rol, Gen_Usu_Rol.ind_act, '
	SELECT @cadena = @cadena + 'CASE WHEN Gen_Usu_Rol.ind_act = ''1'' THEN ''Activo'' ' 
	SELECT @cadena = @cadena + 'WHEN Gen_Usu_Rol.ind_act = ''0'' THEN ''Inactivo'' END AS Des_Ind, ' 
	SELECT @cadena = @cadena + 'Gen_Usu_Rol.log_usu, Gen_Usu_Rol.fec_ini '
	SELECT @cadena = @cadena + 'FROM rhh_emplea Emplea INNER JOIN '+QUOTENAME(@serv_vinculado) + '.' + QUOTENAME(RTRIM(@BaseDatos))+'.dbo.gen_usuario_rol Gen_Usu_Rol ON Emplea.login_portal = Gen_Usu_Rol.log_usu COLLATE Database_Default '
	SELECT @cadena = @cadena + 'INNER JOIN '+QUOTENAME(@serv_vinculado) + '.' + QUOTENAME(RTRIM(@BaseDatos))+'.dbo.gen_roles Gen_Rol ON Gen_Usu_Rol.cod_rol = Gen_Rol.cod_rol '
	SELECT @cadena = @cadena + 'INNER JOIN gen_compania Compania ON Emplea.cod_cia=Compania.cod_cia '
	SELECT @cadena = @cadena + 'LEFT JOIN Rhh_empconv Emp_Conv ON Emplea.cod_emp=Emp_Conv.cod_emp '
	SELECT @cadena = @cadena + 'LEFT JOIN rhh_convenio Conv ON ISNULL(Emp_Conv.cod_conv,''0'')=Conv.cod_conv '
	SELECT @cadena = @cadena + 'WHERE Emplea.num_ide LIKE RTRIM('''+@num_ide+''') AND Compania.cod_cia LIKE RTRIM('''+@cod_cia+''') AND Conv.cod_conv LIKE RTRIM('''+@cod_conv+''') AND Gen_Usu_Rol.ind_act LIKE RTRIM('''+@ind_act+''');'

	INSERT INTO @Tabla(cod_emp, Nombres, num_ide, e_mail, cod_cia, nom_cia, cod_conv, nom_conv, cod_rol, nom_rol, ind_act, des_ind, log_usu, fec_ini)
	EXEC (@cadena)
	PRINT @cadena
	SELECT * FROM @Tabla

END

```
