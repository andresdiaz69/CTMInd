# View: v_GTH_VisitaDomi

## Usa los objetos:
- [[GTH_VisitaDomi]]
- [[GTH_VisitaDomiGen]]

```sql

CREATE VIEW [dbo].[v_GTH_VisitaDomi]
AS
SELECT        dbo.GTH_VisitaDomi.cod_emp, dbo.GTH_VisitaDomi.fec_vis, dbo.GTH_VisitaDomi.obs_vis, dbo.GTH_VisitaDomi.doc_anx, dbo.GTH_VisitaDomi.nom_anx, 
                         dbo.GTH_VisitaDomiGen.asp_pers, dbo.GTH_VisitaDomiGen.situa_fliar, dbo.GTH_VisitaDomiGen.vivienda, dbo.GTH_VisitaDomiGen.situa_acad, 
                         dbo.GTH_VisitaDomiGen.situa_labor, dbo.GTH_VisitaDomiGen.logr_repres, dbo.GTH_VisitaDomiGen.metas, dbo.GTH_VisitaDomiGen.otros, 
                         dbo.GTH_VisitaDomi.num_req, dbo.GTH_VisitaDomi.ID_Visita
FROM            dbo.GTH_VisitaDomi INNER JOIN
                         dbo.GTH_VisitaDomiGen ON dbo.GTH_VisitaDomi.cod_emp = dbo.GTH_VisitaDomiGen.cod_emp AND 
                         dbo.GTH_VisitaDomi.num_req = dbo.GTH_VisitaDomiGen.num_req AND dbo.GTH_VisitaDomi.ID_Visita = dbo.GTH_VisitaDomiGen.ID_Visita


```
