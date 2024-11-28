# View: v_rhh_certifcado

## Usa los objetos:
- [[Rhh_certifcado]]
- [[rhh_certifconcep]]

```sql

CREATE VIEW [dbo].[v_rhh_certifcado]
AS
SELECT 
DISTINCT	    dbo.Rhh_certifcado.Cod_Item, 
		    dbo.Rhh_certifcado.Des_Item, 
		    dbo.Rhh_certifcado.nat_con, 
		    dbo.Rhh_certifcado.Ano_Apl 
FROM          dbo.Rhh_certifcado
INNER JOIN   dbo.rhh_certifconcep ON dbo.Rhh_certifcado.Cod_Item = dbo.rhh_certifconcep.Cod_item AND dbo.Rhh_certifcado.Ano_Apl = dbo.rhh_certifconcep.Ano_Apl

```
