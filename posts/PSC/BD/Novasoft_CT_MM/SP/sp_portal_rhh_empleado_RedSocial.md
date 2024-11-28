# Stored Procedure: sp_portal_rhh_empleado_RedSocial

## Usa los objetos:
- [[gen_usuarios]]
- [[GTH_EmpRedSocial]]
- [[GTH_portal_EmpRedSocial]]
- [[GTH_RedesSociales]]

```sql



-- =============================================
-- Author: Yeinny Garzón			
-- Create date: 29 May 2014
-- Description:	Procedimiento para obtener las redes sociales del empleado

-- SRS2020-0396
-- Modified by: Alexander Vargas
-- MOdified date: 04-05-2020
-- Description: se agrega columna estado para saber si la red social está
--				autorizada o pendientes

-- SRS2020-0396
-- Modified by: Alexander Vargas
-- Modified date: 04/05/2021
-- Description: se agrega tabla GTH_RedesSociales para traer 
--				la descripción de la red social

--SPA2022 – 0045  Eliminar registro HV 
--Modify by:	Alexander Vargas
--Modify date:	08/06/2022
--Description:	se agrega campo para identificar cuales son las redes sociales nuevas, para
--				poderlas borrar si se necesita

-- =============================================

CREATE PROCEDURE [dbo].[sp_portal_rhh_empleado_RedSocial]
	@loginEmplea NVARCHAR(20)

--WITH ENCRYPTION

AS
BEGIN
	DECLARE @cod_Emp CHAR(12)
	
	SELECT @cod_Emp=cod_emp FROM gen_usuarios WHERE RTRIM(log_usu) LIKE @loginEmplea
	
	SELECT  ERS.cod_emp, ERS.cod_redsoc, ERS.usuario, 'Aprobado' AS estado, red.nom_redsoc  
	FROM GTH_EmpRedSocial ERS 
	INNER JOIN GTH_RedesSociales red ON ERS.cod_redsoc=red.cod_redsoc 
	WHERE ERS.cod_emp = @cod_Emp 	
		AND NOT EXISTS(SELECT PERS.cod_emp 
		FROM GTH_portal_EmpRedSocial PERS WHERE PERS.cod_emp = @cod_Emp AND PERS.cod_redsoc = ERS.cod_redsoc)
	UNION ALL
	
	SELECT  PERS.cod_emp, PERS.cod_redsoc, PERS.usuario, 
	IIF(EXISTS(SELECT cod_emp FROM  GTH_EmpRedSocial WHERE cod_emp=@cod_Emp AND cod_redsoc=PERS.cod_redsoc),'Pendiente','Nuevo') as estado,
	red.nom_redsoc 
	FROM GTH_portal_EmpRedSocial PERS
	INNER JOIN GTH_RedesSociales red ON PERS.cod_redsoc=red.cod_redsoc 
	WHERE PERS.cod_emp =RTRIM(@cod_Emp)
END

```
