# View: vw_InformesPowerBI_ConsultaCompleta

## Usa los objetos:
- [[InformesDefinitivos]]
- [[InformesPowerBI_Cumplimiento]]
- [[InformesPresentaciones]]

```sql
--Ejecutar en la base de datos de Informes.
--Mapear la vista en el proyecto.
--Mapear la tabla InformesPowerBI_Cumplimiento en el proyecto para revisar el cambio de dato del campo Efeciciencia de String a Smallint

CREATE VIEW [dbo].[vw_InformesPowerBI_ConsultaCompleta] AS
SELECT DISTINCT a.Año, a.Mes, a.CodigoPresentacion, b.NombrePresentacion, a.CodigoConcepto,
			CASE a.CodigoConcepto WHEN 125 THEN 'Gastos de Personal'
									WHEN 194 THEN 'Costo Financiero Neto'
									WHEN 273 THEN 'Arrendamiento Bienes Inmuebles' 
									ELSE c.NombreConcepto END AS NombreConcepto, a.Eficiencia
FROM InformesPowerBI_Cumplimiento	AS a
INNER JOIN InformesPresentaciones	AS b ON a.CodigoPresentacion = b.CodigoPresentacion
INNER JOIN InformesDefinitivos		AS c ON a.CodigoConcepto = c.CodigoConcepto
WHERE c.Balance <> 18

```
