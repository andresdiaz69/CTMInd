# View: V_SST_EvenNecEntrenam

## Usa los objetos:
- [[SST_Eventos]]

```sql
CREATE VIEW [dbo].[V_SST_EvenNecEntrenam]
AS
SELECT        cod_even, RTRIM(nom_even) + ' (Año: ' + RTRIM(anio) + ' - Versión: ' + RTRIM(version) + ')' AS nom_even, anio
FROM            dbo.SST_Eventos

```
