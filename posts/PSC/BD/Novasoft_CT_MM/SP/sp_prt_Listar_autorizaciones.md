# Stored Procedure: sp_prt_Listar_autorizaciones

## Usa los objetos:
- [[gth_portal_configuracion]]
- [[Server_vinculado]]

```sql


-- =============================================
-- Author:  Alexander Vargas
-- Create date: 26 Jul 2019
-- Description: Consulta para listar autorizaciones y filtrarlas
--- por trámite o por autorizador

-- Modify by:  Alexander Vargas
-- Modify date: 10 Mar 2020
-- Description: Se cambia la instruccion por una cadena con el 
--- fin de cruzar la consulta con la tabla gen_usuarios de Portal
--	y revisar los logins que estan creados como autorizadores

-- Ajustes empaquetado V401
-- Modify by:  Alexander Vargas
-- Modify date: 05/05/2021
-- Description: ajuste para intercalación, se coloca [] en 
--				las descripciones con tile

-- SNR2021-0294 Cambio de autorizador
-- Modify by:  Alexander Vargas
-- Modify date: 30/09/2021
-- Description: ajuste para no incluir los autorizadores retirados

--SRS2023 - 0011 Tamanio variable server vinculado
--Modified by:		Alexander Vargas
--Modified date:	16/01/2023
--Description:		Se aumenta el tamaño de la variable serv_vinculado a 50 caracteres

--Pruebas empaquetado versión 5
--Modified by:		Alexander Vargas
--Modified date:	26/04/2023
--Description:		Se agrega QUOTENAME en el nombre de la base de datos
-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_Listar_autorizaciones]

	@tramite				VARCHAR(50),
	@autorizador			VARCHAR(50)
		
--WITH ENCRYPTION
AS

BEGIN

	SET @tramite= '%' + @tramite + '%'
	SET @autorizador= '%' + @autorizador + '%'

	DECLARE @CADENA VARCHAR(MAX)
	DECLARE @bd_nova VARCHAR(100)

	SELECT @bd_nova= BaseDatos FROM gth_portal_configuracion



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

	IF(@serv_vinculado IS NOT NULL OR @serv_vinculado<>'' )
	BEGIN
		SET @bd_nova=QUOTENAME(@serv_vinculado) + '.' +   QUOTENAME(@bd_nova)
	END

	--*****************************************



SET @CADENA=

	'
		SELECT DISTINCT AUT.cod_autorizacion AS [Código], TRA.descripcion AS [Trámite], emp.nom_emp + '' '' + EMP.ap1_emp + '' '' + EMP.ap2_emp AS Autorizador, 
		ISNULL(aut.niv_aut,0)+1 AS Nivel, aut.niv_sig 
			FROM prt_autorizaciones AUT INNER JOIN gth_tramite AS TRA ON AUT.cod_tra=TRA.codigo 
				INNER JOIN prt_autorizadores AS AT ON AUT.cod_autoriza=AT.codAutorizador COLLATE DATABASE_DEFAULT 
				INNER JOIN rhh_emplea AS emp ON emp.cod_emp =AT.codAutorizador COLLATE DATABASE_DEFAULT 
				INNER JOIN ' + @bd_nova + '.dbo.gen_usuarios AS usu ON AT.codAutorizador=usu.num_ide COLLATE DATABASE_DEFAULT 
			WHERE emp.est_lab NOT IN(''99'') AND TRA.descripcion like ' + QUOTENAME(@tramite,'''') + ' AND AT.nombre LIKE ' + QUOTENAME(@autorizador,'''') +
			' AND AUT.aut_activa=1 ORDER BY AUT.cod_autorizacion

	'

	EXEC (@CADENA)
	PRINT (@CADENA)
END

```
