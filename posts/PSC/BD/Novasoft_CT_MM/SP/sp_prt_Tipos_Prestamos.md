# Stored Procedure: sp_prt_Tipos_Prestamos

## Usa los objetos:
- [[gth_portal_configuracion]]

```sql





-- =============================================
-- Author:		Alexander Vargas
-- Create date: 09/12/2021
-- Description:	Tipo de préstamos para utilizar en el Portal
--

--SRS2023-0333 Error por intercalación
--Modified by:	Alexander Vargas
--Modified date:	24/04/2023
--Description:	Se agrega COLLATE DATABASE_DEFAULT en la subconsulta de tipos de prestamo

-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_Tipos_Prestamos] 


--WITH ENCRYPTION
AS
BEGIN
	
	DECLARE @cadena				NVARCHAR(MAX)
	DECLARE @bd_portal			VARCHAR(100)
	DECLARE @servidor			VARCHAR(100)
	DECLARE @ruta_bdportal		VARCHAR(200)

	 
	 SELECT @bd_portal = basedatos FROM gth_portal_configuracion
	 SELECT @servidor = Servidor FROM gth_portal_configuracion

	 SET @ruta_bdportal =CONCAT('[',@servidor,'].[',@bd_portal,'].dbo.')

	 SET @cadena =	 
		 '
		SELECT cod_con,RTRIM(nom_con) AS nom_con,mod_liq, convert(BIT,0) as seleccion FROM V_rhh_concep WHERE apl_con=3 AND (nov_rel=1 OR nov_rel=3)
		AND cod_con+mod_liq NOT IN(SELECT cod_con+mod_liq COLLATE DATABASE_DEFAULT FROM ' + @ruta_bdportal + 'prt_tipo_Prestamo) ORDER BY cod_con
		'

	EXEC (@cadena)
	print @cadena

END

```
