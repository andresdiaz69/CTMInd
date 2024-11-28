# View: V_SST_RevEntrada

## Usa los objetos:
- [[SST_ListEntradas]]
- [[SST_RevAltaDirEntCue]]

```sql

CREATE VIEW [dbo].[V_SST_RevEntrada]
AS
SELECT	RC.cons, RC.cod_ent, LE.des_ent
FROM    SST_RevAltaDirEntCue AS RC
INNER	JOIN SST_ListEntradas AS LE ON RC.cod_ent = LE.cod_ent


```
