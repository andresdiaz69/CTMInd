# Stored Procedure: sp_portal_rhh_empleado_Idioma

## Usa los objetos:
- [[gen_usuarios]]
- [[GTH_Calificacion]]
- [[rhh_idioma]]
- [[rhh_portal_idioma]]
- [[rhh_tbidioma]]

```sql




-- =============================================
-- Author:		David Alarcon
-- Create date: 10-08-2011
-- Description:	Procedimiento para obtener los idiomas del empleado

-- Ajustes empaquetado V401
-- Modified by: Alexander Vargas
-- Modified date: 04/05/2021
-- Description: se agrega tabla GTH_Calificacion para traer 
--				la descripción de la calificacion en el manejo del idioma

--SPA2022 – 0045  Eliminar registro HV 
--Modify by:	Alexander Vargas
--Modify date:	08/06/2022
--Description:	se agrega campo para identificar cuales son los idiomas nuevos, para
--				poderlos borrar si se necesita

-- =============================================
CREATE PROCEDURE [dbo].[sp_portal_rhh_empleado_Idioma]
	@loginEmplea NVARCHAR(20)
	
	--WITH ENCRYPTION
AS
BEGIN
	DECLARE @cod_Emp CHAR(12)
	
	SELECT @cod_Emp=cod_emp FROM gen_usuarios WHERE RTRIM(log_usu) LIKE RTRIM(@loginEmplea)
	
	SELECT  i.cod_emp, i.cod_idi, i.cod_calif, idio.nom_idi, calif.Txt_Calif,
	'Aprobado' AS estado     
	FROM rhh_idioma i 
	INNER JOIN rhh_tbidioma idio ON I.cod_idi=idio.cod_idi 
	LEFT JOIN GTH_Calificacion calif ON I.cod_calif=calif.cod_calif 
	WHERE i.cod_emp = @cod_Emp AND i.cod_emp NOT IN (SELECT pii.cod_emp FROM rhh_portal_idioma pii 
													WHERE pii.cod_emp = i.cod_emp AND pii.cod_idi=i.cod_idi) 
	UNION ALL
	SELECT cod_emp, pi.cod_idi,pi.cod_calif, idio.nom_idi, calif.Txt_Calif,
	IIF(EXISTS(SELECT cod_emp FROM  rhh_idioma WHERE cod_emp=@cod_Emp AND cod_idi=pi.cod_idi),'Pendiente','Nuevo') as estado 
	FROM rhh_portal_idioma pi
	INNER JOIN rhh_tbidioma idio ON pi.cod_idi=idio.cod_idi 
	INNER JOIN GTH_Calificacion calif ON pi.cod_calif=calif.cod_calif 
	WHERE cod_emp = @cod_Emp
END

```
