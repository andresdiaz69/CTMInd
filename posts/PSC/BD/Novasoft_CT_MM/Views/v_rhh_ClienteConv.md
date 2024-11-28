# View: v_rhh_ClienteConv

## Usa los objetos:
- [[cxc_cliente]]
- [[rhh_ClienteConvenio]]

```sql

CREATE VIEW [dbo].[v_rhh_ClienteConv]
AS

SELECT DISTINCT b.cod_cli AS cod_cli,a.nom_cli
FROM cxc_cliente a INNER JOIN rhh_ClienteConvenio b ON a.cod_cli=b.cod_cli

```
