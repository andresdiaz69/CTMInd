# View: vw_CargosProductividad

## Usa los objetos:
- [[Cargos]]

```sql
CREATE VIEW [dbo].[vw_CargosProductividad] AS 

SELECT CodigoCargo, NombreCargo, Activo, Obsoleto, AplicaBonificacionTaller, CodigoConceptoBonificacionTaller 
FROM Cargos
WHERE ((CodigoCargo IN (25, 174, 471, 31, 351, 392, 395, 87, 82, 246, 106, 324, 170, 600,777,786,781,772,785,774,788,779,775,830,787,780,776,783,773,782,789) --and CodigoCargo not like ('0%')
	) OR (CodigoCargo IN (172, 72, 300, 107, 266, 267, 328, 317) AND NombreCargo LIKE ('(NA)%')))


```
