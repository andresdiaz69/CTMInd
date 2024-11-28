# View: v_rhh_UPC_Adi

## Usa los objetos:
- [[rhh_familia]]
- [[rhh_UPC_Adi]]

```sql
CREATE VIEW [dbo].[v_rhh_UPC_Adi]
AS
SELECT     dbo.rhh_UPC_Adi.cod_emp, dbo.rhh_UPC_Adi.num_ced, dbo.rhh_familia.ap1_fam, dbo.rhh_familia.ap2_fam, dbo.rhh_familia.nom_fam, dbo.rhh_UPC_Adi.fec_nov, 
                      dbo.rhh_UPC_Adi.fec_has, dbo.rhh_UPC_Adi.apl_con, dbo.rhh_UPC_Adi.val_upc
FROM         dbo.rhh_UPC_Adi INNER JOIN
                      dbo.rhh_familia ON dbo.rhh_UPC_Adi.cod_emp = dbo.rhh_familia.cod_emp AND dbo.rhh_UPC_Adi.num_ced = dbo.rhh_familia.num_ced


```
