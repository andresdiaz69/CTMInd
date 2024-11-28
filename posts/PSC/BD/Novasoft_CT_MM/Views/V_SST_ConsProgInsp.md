# View: V_SST_ConsProgInsp

## Usa los objetos:
- [[SST_ProgramacionCronInspec]]
- [[V_SST_ConsInsp]]

```sql
CREATE VIEW [dbo].[V_SST_ConsProgInsp]
AS
SELECT        I.cod_cia, I.anio, I.version, I.cons, I.cons_inspec, P.cons_prog, 'Desde: ' + RTRIM(CONVERT(CHAR, P.fec_ini, 103)) + ' Hasta: ' + RTRIM(CONVERT(CHAR, P.fec_fin, 103)) AS des_prog
FROM            dbo.V_SST_ConsInsp AS I INNER JOIN
                         dbo.SST_ProgramacionCronInspec AS P ON I.cod_cia = P.cod_cia AND I.anio = P.anio AND I.version = P.version AND I.cons = P.cons AND I.cons_inspec = P.cons_inspec
;
```
