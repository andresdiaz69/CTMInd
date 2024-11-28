# View: V_SST_AnioObjetivo

## Usa los objetos:
- [[SST_ObjetivoGral]]

```sql
CREATE VIEW [dbo].[V_SST_AnioObjetivo]
AS
SELECT	cod_cia, cod_obj_gral, anio_obj_gral
FROM	dbo.SST_ObjetivoGral
GROUP	BY cod_cia, cod_obj_gral, anio_obj_gral

```
