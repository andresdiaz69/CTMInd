# View: v_nom_cuedoc

## Usa los objetos:
- [[fn_rhh_Empleados_Usuario]]
- [[nom_cuedoc]]

```sql
CREATE VIEW [dbo].[v_nom_cuedoc]
AS
SELECT        dbo.nom_cuedoc.ano_doc, dbo.nom_cuedoc.per_doc, dbo.nom_cuedoc.tip_doc, dbo.nom_cuedoc.sub_tip, dbo.nom_cuedoc.num_doc, dbo.nom_cuedoc.trans, 
                         dbo.nom_cuedoc.tip_liq, dbo.nom_cuedoc.cod_con, dbo.nom_cuedoc.cod_emp, dbo.nom_cuedoc.can_doc, dbo.nom_cuedoc.val_doc, dbo.nom_cuedoc.fec_doc, 
                         dbo.nom_cuedoc.cod_conv, dbo.nom_cuedoc.reg_doc, dbo.nom_cuedoc.fec_apl
FROM            dbo.nom_cuedoc INNER JOIN
                         dbo.fn_rhh_Empleados_Usuario(USER_NAME(), NULL, NULL) AS F ON F.cod_emp = dbo.nom_cuedoc.cod_emp


```
