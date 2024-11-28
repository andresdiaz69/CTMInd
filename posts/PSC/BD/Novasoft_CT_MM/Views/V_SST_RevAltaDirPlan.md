# View: V_SST_RevAltaDirPlan

## Usa los objetos:
- [[SST_RevAltaDirEntCue]]

```sql
CREATE VIEW [dbo].[V_SST_RevAltaDirPlan]
AS
SELECT	cons, cod_ent, cod_cia
FROM    SST_RevAltaDirEntCue
WHERE	ind_plan = 1;

```
