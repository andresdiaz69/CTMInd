# View: v_inv_ica_docum

## Usa los objetos:
- [[v_inv_ica_cli_pro]]

```sql

CREATE VIEW [dbo].[v_inv_ica_docum]
AS

SELECT DISTINCT codigo,suc_cli,cod_pai,cod_dep,cod_ciu,cod_act,nom_act,trf_act,val_top
FROM v_inv_ica_cli_pro

```
