# View: v_GTH_Entrevista

## Usa los objetos:
- [[GTH_EntrevGen]]
- [[GTH_Entrevista]]

```sql

CREATE VIEW [dbo].[v_GTH_Entrevista]
AS
SELECT        dbo.GTH_Entrevista.cod_emp, dbo.GTH_Entrevista.fec_ent, dbo.GTH_Entrevista.obs_ent, dbo.GTH_Entrevista.num_req, dbo.GTH_EntrevGen.asp_pers, 
                         dbo.GTH_EntrevGen.situa_fliar, dbo.GTH_EntrevGen.vivienda, dbo.GTH_EntrevGen.situa_acad, dbo.GTH_EntrevGen.situa_labor, dbo.GTH_EntrevGen.logr_repres, 
                         dbo.GTH_EntrevGen.metas, dbo.GTH_EntrevGen.otros, dbo.GTH_EntrevGen.sal_esp, dbo.GTH_Entrevista.cod_ent, dbo.GTH_Entrevista.Tip_Ent
FROM            dbo.GTH_Entrevista INNER JOIN
                         dbo.GTH_EntrevGen ON dbo.GTH_Entrevista.cod_emp = dbo.GTH_EntrevGen.cod_emp AND dbo.GTH_Entrevista.num_req = dbo.GTH_EntrevGen.num_req AND 
                         dbo.GTH_Entrevista.cod_ent = dbo.GTH_EntrevGen.cod_ent


```
