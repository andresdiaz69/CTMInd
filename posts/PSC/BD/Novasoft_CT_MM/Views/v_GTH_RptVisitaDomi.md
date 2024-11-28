# View: v_GTH_RptVisitaDomi

## Usa los objetos:
- [[GTH_RptVisitaDomi]]
- [[GTH_RptVisitaDomiGen]]

```sql

CREATE VIEW [dbo].[v_GTH_RptVisitaDomi]
AS
SELECT        dbo.GTH_RptVisitaDomi.cod_emp, dbo.GTH_RptVisitaDomi.fec_vis, dbo.GTH_RptVisitaDomi.obs_vis, dbo.GTH_RptVisitaDomi.num_req, 
                         dbo.GTH_RptVisitaDomi.doc_anx, dbo.GTH_RptVisitaDomi.nom_anx, dbo.GTH_RptVisitaDomiGen.asp_pers, dbo.GTH_RptVisitaDomiGen.situa_fliar, 
                         dbo.GTH_RptVisitaDomiGen.vivienda, dbo.GTH_RptVisitaDomiGen.situa_acad, dbo.GTH_RptVisitaDomiGen.situa_labor, dbo.GTH_RptVisitaDomiGen.logr_repres, 
                         dbo.GTH_RptVisitaDomiGen.metas, dbo.GTH_RptVisitaDomiGen.otros, dbo.GTH_RptVisitaDomi.ID_Visita
FROM            dbo.GTH_RptVisitaDomi INNER JOIN
                         dbo.GTH_RptVisitaDomiGen ON dbo.GTH_RptVisitaDomi.cod_emp = dbo.GTH_RptVisitaDomiGen.cod_emp AND 
                         dbo.GTH_RptVisitaDomi.num_req = dbo.GTH_RptVisitaDomiGen.num_req AND dbo.GTH_RptVisitaDomi.ID_Visita = dbo.GTH_RptVisitaDomiGen.ID_Visita


```
