# View: vw_TallerTecnicos_2

## Usa los objetos:
- [[ExogenasHorasEmpleados]]

```sql

CREATE VIEW [dbo].[vw_TallerTecnicos_2]
AS
SELECT        Ano, Mes, CodigoEmpleado, ISNULL(SUM(Horas), 0) AS HorasImproductivas
FROM            dbo.ExogenasHorasEmpleados
WHERE        (Aprobada = 'True')
GROUP BY Ano, Mes, CodigoEmpleado




```
