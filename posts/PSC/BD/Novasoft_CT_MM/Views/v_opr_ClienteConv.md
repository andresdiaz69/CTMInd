# View: v_opr_ClienteConv

## Usa los objetos:
- [[cxc_cliente]]
- [[rhh_convenio]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_opr_ClienteConv]
AS

SELECT DISTINCT b.cod_cli AS cod_cli,a.nom_cli,b.cod_conv
FROM cxc_cliente AS a WITH (NOLOCK) INNER JOIN rhh_convenio AS b WITH (NOLOCK) ON a.cod_cli=b.cod_cli

```
