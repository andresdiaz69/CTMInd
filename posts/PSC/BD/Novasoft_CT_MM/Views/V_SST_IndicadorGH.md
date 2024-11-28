# View: V_SST_IndicadorGH

## Usa los objetos:
- [[GTH_IndicadoresGH]]

```sql
CREATE VIEW [dbo].[V_SST_IndicadorGH]
AS
SELECT        cod_apl, cod_mod, cod_ind, nom_ind, tip_ind, met_ind, def_ind, fte_ind, uni_med
FROM            dbo.GTH_IndicadoresGH
WHERE        (cod_apl = 'GTH') AND (ind_des = 0)

```
