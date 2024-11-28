# View: V_SST_ConsInsp

## Usa los objetos:
- [[SST_CronogramaInspecciones]]
- [[SST_InspeccionCronInspec]]
- [[SST_TipInspec]]

```sql
CREATE VIEW [dbo].[V_SST_ConsInsp]
AS
SELECT        C.cod_cia, C.anio, C.version, C.cons, I.cons_inspec, T.des_inspec
FROM            dbo.SST_CronogramaInspecciones AS C INNER JOIN
                         dbo.SST_InspeccionCronInspec AS I ON C.cod_cia = I.cod_cia AND C.anio = I.anio AND C.version = I.version AND C.cons = I.cons INNER JOIN
                         dbo.SST_TipInspec AS T ON I.tip_inspec = T.tip_inspec;
```
