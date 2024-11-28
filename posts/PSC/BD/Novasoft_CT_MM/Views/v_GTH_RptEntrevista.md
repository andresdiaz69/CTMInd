# View: v_GTH_RptEntrevista

## Usa los objetos:
- [[GTH_RptEntrevGen]]
- [[GTH_RptEntrevista]]

```sql

CREATE VIEW [dbo].[v_GTH_RptEntrevista]
AS
SELECT        dbo.GTH_RptEntrevista.cod_emp, dbo.GTH_RptEntrevista.fec_ent, dbo.GTH_RptEntrevista.obs_ent, dbo.GTH_RptEntrevGen.asp_pers, 
                         dbo.GTH_RptEntrevGen.situa_fliar, dbo.GTH_RptEntrevGen.vivienda, dbo.GTH_RptEntrevGen.situa_acad, dbo.GTH_RptEntrevGen.situa_labor, 
                         dbo.GTH_RptEntrevGen.logr_repres, dbo.GTH_RptEntrevGen.metas, dbo.GTH_RptEntrevGen.otros, dbo.GTH_RptEntrevGen.sal_esp, 
                         dbo.GTH_RptEntrevista.cod_ent, dbo.GTH_RptEntrevista.num_req, dbo.GTH_RptEntrevista.Tip_Ent
FROM            dbo.GTH_RptEntrevista INNER JOIN
                         dbo.GTH_RptEntrevGen ON dbo.GTH_RptEntrevista.cod_emp = dbo.GTH_RptEntrevGen.cod_emp AND 
                         dbo.GTH_RptEntrevista.num_req = dbo.GTH_RptEntrevGen.num_req AND dbo.GTH_RptEntrevista.cod_ent = dbo.GTH_RptEntrevGen.cod_ent


```
