# View: v_inv_rotacion

## Usa los objetos:
- [[gen_sucursal]]
- [[inv_acum]]
- [[inv_bodegas]]
- [[inv_grupos]]
- [[inv_items]]
- [[inv_subgrupos]]

```sql

CREATE VIEW [dbo].[v_inv_rotacion]
AS
SELECT     dbo.inv_acum.cod_item, dbo.inv_acum.cod_suc, dbo.inv_acum.ano_acu, dbo.inv_acum.cod_bod, dbo.inv_grupos.cod_gru, dbo.inv_items.des_item,
                      dbo.inv_grupos.nom_gru, dbo.gen_sucursal.nom_suc, dbo.inv_bodegas.nom_bod, dbo.inv_acum.enun01, dbo.inv_acum.enun02, 
                      dbo.inv_acum.enun03, dbo.inv_acum.enun04, dbo.inv_acum.enun05, dbo.inv_acum.enun06, dbo.inv_acum.enun07, dbo.inv_acum.enun08, 
                      dbo.inv_acum.enun09, dbo.inv_acum.enun10, dbo.inv_acum.enun11, dbo.inv_acum.enun12, dbo.inv_acum.saun01, dbo.inv_acum.saun02, 
                      dbo.inv_acum.saun03, dbo.inv_acum.saun04, dbo.inv_acum.saun05, dbo.inv_acum.saun06, dbo.inv_acum.saun07, dbo.inv_acum.saun08, 
                      dbo.inv_acum.saun09, dbo.inv_acum.saun10, dbo.inv_acum.saun11, dbo.inv_acum.saun12, dbo.inv_acum.ttun00, dbo.inv_acum.ttun01, 
                      dbo.inv_acum.ttun02, dbo.inv_acum.ttun04, dbo.inv_acum.ttun03, dbo.inv_acum.ttun05, dbo.inv_acum.ttun06, dbo.inv_acum.ttun07, 
                      dbo.inv_acum.ttun08, dbo.inv_acum.ttun09, dbo.inv_acum.ttun10, dbo.inv_acum.ttun11, dbo.inv_acum.ttun12, dbo.inv_acum.enpe01, 
                      dbo.inv_acum.enpe02, dbo.inv_acum.enpe03, dbo.inv_acum.enpe04, dbo.inv_acum.enpe05, dbo.inv_acum.enpe06, dbo.inv_acum.enpe07, 
                      dbo.inv_acum.enpe08, dbo.inv_acum.enpe09, dbo.inv_acum.enpe10, dbo.inv_acum.enpe11, dbo.inv_acum.enpe12, dbo.inv_acum.sape01, 
                      dbo.inv_acum.sape02, dbo.inv_acum.sape03, dbo.inv_acum.sape04, dbo.inv_acum.sape05, dbo.inv_acum.sape06, dbo.inv_acum.sape07, 
                      dbo.inv_acum.sape08, dbo.inv_acum.sape09, dbo.inv_acum.sape10, dbo.inv_acum.sape11, dbo.inv_acum.sape12, dbo.inv_acum.tnpe00, 
                      dbo.inv_acum.tnpe01, dbo.inv_acum.tnpe02, dbo.inv_acum.tnpe04, dbo.inv_acum.tnpe03, dbo.inv_acum.tnpe05, dbo.inv_acum.tnpe06, 
                      dbo.inv_acum.tnpe07, dbo.inv_acum.tnpe08, dbo.inv_acum.tnpe09, dbo.inv_acum.tnpe10, dbo.inv_acum.tnpe11, dbo.inv_acum.tnpe12,
					  dbo.inv_subgrupos.cod_sub,dbo.inv_subgrupos.nom_sub
FROM         dbo.inv_acum WITH(NOLOCK)
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item 
	INNER JOIN dbo.inv_grupos WITH(NOLOCK) ON dbo.inv_items.cod_grupo = dbo.inv_grupos.cod_gru 
	INNER JOIN dbo.inv_bodegas WITH(NOLOCK) ON dbo.inv_acum.cod_bod = dbo.inv_bodegas.cod_bod 
	INNER JOIN dbo.gen_sucursal WITH(NOLOCK) ON dbo.inv_acum.cod_suc = dbo.gen_sucursal.cod_suc AND dbo.inv_bodegas.cod_suc = dbo.gen_sucursal.cod_suc INNER JOIN
					  dbo.inv_subgrupos ON dbo.inv_items.cod_grupo = dbo.inv_subgrupos.cod_gru  AND dbo.inv_items.cod_subgrupo = dbo.inv_subgrupos.cod_sub 

```
