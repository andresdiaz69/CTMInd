# View: v_rhh_prestprog

## Usa los objetos:
- [[rhh_prestprog]]

```sql

CREATE VIEW [dbo].[v_rhh_prestprog]
AS
SELECT     cod_emp,
		 cod_con,
		 Convert(char(10),sec_pre) as sec_pre,
		 fec_cuo,
		 val_cuo,
		 ind_pag,
		 val_vac_prop
FROM         dbo.rhh_prestprog

```
