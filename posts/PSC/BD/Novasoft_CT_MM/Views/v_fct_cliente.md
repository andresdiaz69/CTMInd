# View: v_fct_cliente

## Usa los objetos:
- [[cxc_cliente]]
- [[fct_Cliente]]

```sql

CREATE VIEW [dbo].[v_fct_cliente]
AS
SELECT        dbo.fct_Cliente.cod_cli, dbo.cxc_cliente.nom_cli
FROM            dbo.fct_Cliente WITH (NOLOCK) 
					INNER JOIN dbo.cxc_cliente WITH(NOLOCK) ON dbo.fct_Cliente.cod_cli = dbo.cxc_cliente.cod_cli;

```
