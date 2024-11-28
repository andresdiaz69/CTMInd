# View: v_Novasoft_nom_vargen

## Usa los objetos:
- [[nom_vargen]]

```sql

CREATE VIEW [dbo].[v_Novasoft_nom_vargen]
AS
SELECT        num_var, nom_var, tip_var, val_var, tip_vge, ind_his, ind_sist, ind_ctt
FROM            Novasoft_CT_MM.dbo.nom_vargen
WHERE        (num_var = 60)

```
