# View: v_inv_rentabilidad

## Usa los objetos:
- [[inv_acum]]
- [[inv_grupos]]
- [[inv_items]]

```sql

CREATE VIEW [dbo].[v_inv_rentabilidad]
AS
SELECT     dbo.inv_acum.cod_item, dbo.inv_acum.cod_suc, dbo.inv_acum.cod_bod, dbo.inv_acum.ano_acu, dbo.inv_acum.veun01, dbo.inv_acum.vepe01, 
                      dbo.inv_acum.veun02, dbo.inv_acum.veun03, dbo.inv_acum.veun04, dbo.inv_acum.veun05, dbo.inv_acum.veun06, dbo.inv_acum.veun07, 
                      dbo.inv_acum.veun08, dbo.inv_acum.veun09, dbo.inv_acum.veun10, dbo.inv_acum.veun11, dbo.inv_acum.veun12, dbo.inv_acum.vepe02, 
                      dbo.inv_acum.vepe03, dbo.inv_acum.vepe04, dbo.inv_acum.vepe05, dbo.inv_acum.vepe06, dbo.inv_acum.vepe07, dbo.inv_acum.vepe09, 
                      dbo.inv_acum.vepe08, dbo.inv_acum.vepe10, dbo.inv_acum.vepe11, dbo.inv_acum.vepe12, dbo.inv_acum.cove01, dbo.inv_acum.cove02, 
                      dbo.inv_acum.cove03, dbo.inv_acum.cove04, dbo.inv_acum.cove05, dbo.inv_acum.cove06, dbo.inv_acum.cove07, dbo.inv_acum.cove08, 
                      dbo.inv_acum.cove09, dbo.inv_acum.cove10, dbo.inv_acum.cove11, dbo.inv_acum.cove12, dbo.inv_acum.utbr01, dbo.inv_acum.utbr02, 
                      dbo.inv_acum.utbr03, dbo.inv_acum.utbr04, dbo.inv_acum.utbr05, dbo.inv_acum.utbr06, dbo.inv_acum.utbr07, dbo.inv_acum.utbr08, 
                      dbo.inv_acum.utbr09, dbo.inv_acum.utbr10, dbo.inv_acum.utbr11, dbo.inv_acum.utbr12, dbo.inv_items.des_item, dbo.inv_grupos.nom_gru, 
                      dbo.inv_items.cod_grupo,dbo.inv_acum.covi01, dbo.inv_acum.covi02, 
                      dbo.inv_acum.covi03, dbo.inv_acum.covi04, dbo.inv_acum.covi05, dbo.inv_acum.covi06, dbo.inv_acum.covi07, dbo.inv_acum.covi08, 
                      dbo.inv_acum.covi09, dbo.inv_acum.covi10, dbo.inv_acum.covi11, dbo.inv_acum.covi12
FROM         dbo.inv_acum WITH(NOLOCK)
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_acum.cod_item = dbo.inv_items.cod_item 
	INNER JOIN dbo.inv_grupos WITH(NOLOCK) ON dbo.inv_items.cod_grupo = dbo.inv_grupos.cod_gru

```
