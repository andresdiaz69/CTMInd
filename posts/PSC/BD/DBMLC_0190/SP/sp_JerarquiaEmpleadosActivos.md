# Stored Procedure: sp_JerarquiaEmpleadosActivos

## Usa los objetos:
- [[EmpleadosActivos]]
- [[JerarquiaEmpleados]]

```sql


CREATE PROCEDURE [dbo].[sp_JerarquiaEmpleadosActivos]
@Cedula as int

AS
BEGIN

	SET NOCOUNT ON;

  
SELECT 

JE.Nombre AS Nombre,
ISNULL(JE.Cedula, EA.Documento) AS Documento,
JE.CC_Jefe1 AS CC_Jefe_1,
JE.CC_Jefe2 AS CC_Jefe2, 
JE.CC_Jefe3 AS CC_Jefe3, 
JE.CC_Jefe4 AS CC_Jefe4, 
JE.CC_Jefe5 AS CC_Jefe5,
EA.Ano_Periodo AS Ano_Periodo_Activo,
EA.Mes_Periodo AS Mes_Periodo_Activo

FROM


(SELECT Nombre, Cedula, CC_Jefe1, CC_Jefe2, CC_Jefe3, CC_Jefe4, CC_Jefe5
FROM  dbo.JerarquiaEmpleados 
WHERE Cedula = @Cedula
GROUP BY Nombre, Cedula, CC_Jefe1, CC_Jefe2, CC_Jefe3, CC_Jefe4, CC_Jefe5) AS JE

INNER JOIN

(SELECT Ano_Periodo, Mes_Periodo, Documento
FROM dbo.EmpleadosActivos 
WHERE Documento = @Cedula
GROUP BY Documento, Ano_Periodo, Mes_Periodo) AS EA

ON JE.Cedula = EA.Documento
							 

END 

```
