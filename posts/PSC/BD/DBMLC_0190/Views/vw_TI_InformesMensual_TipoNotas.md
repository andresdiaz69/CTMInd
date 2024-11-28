# View: vw_TI_InformesMensual_TipoNotas

## Usa los objetos:
- [[TI_InformeMensual_Area]]
- [[TI_InformeMensual_TipoNotas]]
- [[TI_InformesMensual_DescripcionNotas]]

```sql
CREATE VIEW [dbo].[vw_TI_InformesMensual_TipoNotas] AS
SELECT A.IdTable, A.Año, A.Mes, A.IdArea, C.Area, IdTipoNota=A.TipoNota, DescTipoNota=B.Nota, A.NumeroSecuencial, A.Observaciones 
FROM TI_InformeMensual_TipoNotas A
LEFT JOIN TI_InformesMensual_DescripcionNotas B ON A.TipoNota = B.IdNota
LEFT JOIN TI_InformeMensual_Area C ON A.IdArea = C.IdArea

```
