# View: v_pre_difconta

## Usa los objetos:
- [[cnt_acusyc]]
- [[pre_acumula]]
- [[pre_rubro]]

```sql



CREATE VIEW [dbo].[v_pre_difconta]
AS
SELECT     dbo.pre_acumula.ano_acu, dbo.pre_rubro.cod_cue AS cuenta, dbo.pre_acumula.cod_rubro AS rubro, SUM(dbo.pre_acumula.fac_01) 
                      + SUM(dbo.pre_acumula.fac_02) + SUM(dbo.pre_acumula.fac_03) + SUM(dbo.pre_acumula.fac_04) + SUM(dbo.pre_acumula.fac_05) AS presupuesto, 0 AS contabilidad
FROM         dbo.pre_acumula INNER JOIN
                      dbo.pre_rubro ON dbo.pre_acumula.cod_rubro = dbo.pre_rubro.cod_rub
GROUP BY dbo.pre_acumula.ano_acu, dbo.pre_rubro.cod_cue, dbo.pre_acumula.cod_rubro
UNION ALL
SELECT     dbo.cnt_acusyc.ano_acu, pre_rubro_1.cod_cue AS cuenta, pre_rubro_1.cod_rub AS rubro, 0 AS presupuesto, SUM(dbo.cnt_acusyc.sal_05) 
                      AS contabilidad
FROM         dbo.cnt_acusyc INNER JOIN
                      dbo.pre_rubro AS pre_rubro_1 ON dbo.cnt_acusyc.cod_cta = pre_rubro_1.cod_cue
GROUP BY dbo.cnt_acusyc.ano_acu, pre_rubro_1.cod_cue, pre_rubro_1.cod_rub




```
