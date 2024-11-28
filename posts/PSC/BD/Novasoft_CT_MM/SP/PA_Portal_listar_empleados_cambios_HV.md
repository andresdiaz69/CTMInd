# Stored Procedure: PA_Portal_listar_empleados_cambios_HV

## Usa los objetos:
- [[gth_portal_configuracion]]

```sql


-- =============================================
-- Author:		Alexander Vargas
-- Create date: 22/03/2018
-- Description:	Crea una lista de empleados con cambios en la HV

-- Modified by:	Alexander Vargas
-- Modified date: 22/03/2018
-- Description:	En la consulta se agrega los documentos relacionados de la hoja de vida del empleado
--				para esto se debe consultar la base de Portal, ya que esa tabla se encuentra ubicada
--				en esa base de datos

-- Modified by:	Alexander Vargas
-- Modified date: 16/03/2023
-- Description:	se agrega prt_portal_DatosFinancieros

-- =============================================
CREATE PROCEDURE [dbo].[PA_Portal_listar_empleados_cambios_HV]

	@opc	 CHAR(2)='C' --C:Consultar todos los cambios de la informacion basica pendientes

--WITH ENCRYPTION	
AS
BEGIN
	DECLARE @BDPORTAL VARCHAR(255)

	DECLARE @CADENA NVARCHAR(MAX)

	SELECT DISTINCT @BDPORTAL=  BaseDatos FROM gth_portal_configuracion



	BEGIN

		IF (@opc='C')
		BEGIN


		SET @CADENA='

			SELECT HV.cod_emp,RTRIM(EMP.nom_emp) + '' '' + RTRIM(EMP.ap1_emp) + '' '' + RTRIM(EMP.ap2_emp) AS ''Empleado'',emp.e_mail
			FROM 
				(
				select cod_emp from rhh_portal_emplea 
				UNION 
				select cod_emp from prt_portal_DatosFinancieros 
				UNION 
				select cod_emp from rhh_portal_estudio
				UNION 
				select cod_emp from rhh_portal_familia
				UNION 
				select cod_emp from prt_Portal_Emp_Vivienda
				UNION 
				select cod_emp from prt_portal_DiscapEmplea
				UNION 
				select cod_emp from rhh_portal_idioma
				UNION 
				select cod_emp from GTH_portal_EmpRedSocial
				UNION 
				select cod_emp from GTH_portal_DotaTallaEmplea
				UNION
				select cod_emp COLLATE DATABASE_DEFAULT  from ' + QUOTENAME(@BDPORTAL) + '.dbo.prt_DocRelacionadosEmpTemp
				) AS HV 
			INNER JOIN rhh_emplea AS EMP ON HV.cod_emp=EMP.cod_emp COLLATE DATABASE_DEFAULT  '

			--PRINT(@CADENA)

			EXECUTE sp_executesql @CADENA
		END

	END
END

```
