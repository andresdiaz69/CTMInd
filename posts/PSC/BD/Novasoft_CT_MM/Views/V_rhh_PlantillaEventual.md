# View: V_rhh_PlantillaEventual

## Usa los objetos:
- [[rhh_Convenio]]
- [[rhh_pertlq]]
- [[Rhh_Plantilla]]
- [[Rhh_PlantProg]]

```sql

CREATE VIEW [dbo].[V_rhh_PlantillaEventual]
AS
SELECT        P.cod_plt, P.des_plt, CV.cod_conv, Pl.fec_ini, Pl.fec_fin
FROM            dbo.Rhh_Plantilla AS P INNER JOIN
                         dbo.Rhh_PlantProg AS Pr ON P.cod_plt = Pr.cod_plt AND Pr.ind_apro_liq = 0 AND Pr.tip_liq = '01' INNER JOIN
                         dbo.rhh_pertlq AS Pl ON Pr.fec_cte = Pl.fec_fin INNER JOIN
                         dbo.rhh_Convenio AS CV ON Pl.cod_tlq = CV.cod_tlq
WHERE        (P.Tip_plt = 2)

```
