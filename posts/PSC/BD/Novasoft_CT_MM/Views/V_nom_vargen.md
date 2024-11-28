# View: V_nom_vargen

## Usa los objetos:
- [[nom_vargen]]

```sql
CREATE VIEW [dbo].[V_nom_vargen]
AS
SELECT
	num_var,	
	nom_var,	
	tip_var,	
	val_var,	
	tip_vge,
	ind_his,
	ind_sist,
	ind_ctt
FROM nom_vargen
WHERE  ind_ctt = 1
```
