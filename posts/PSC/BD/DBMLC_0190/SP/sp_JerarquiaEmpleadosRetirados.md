# Stored Procedure: sp_JerarquiaEmpleadosRetirados

## Usa los objetos:
- [[EmpleadosRetirados]]
- [[JerarquiaEmpleados]]

```sql


CREATE PROCEDURE [dbo].[sp_JerarquiaEmpleadosRetirados]
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
EA.Fecha_retiro AS Fecha_Retiro
--EA.Mes_Periodo AS Mes_Periodo_Activo

FROM


(SELECT Nombre, Cedula, CC_Jefe1, CC_Jefe2, CC_Jefe3, CC_Jefe4, CC_Jefe5
FROM  dbo.JerarquiaEmpleados 
WHERE Cedula = @Cedula
GROUP BY Nombre, Cedula, CC_Jefe1, CC_Jefe2, CC_Jefe3, CC_Jefe4, CC_Jefe5) AS JE

INNER JOIN

(SELECT Fecha_retiro, Documento
FROM dbo.EmpleadosRetirados 
WHERE Documento = @Cedula
GROUP BY Documento, Fecha_retiro) AS EA

ON JE.Cedula = EA.Documento
							 

END 

```
