# View: V_gen_SucursalConv

## Usa los objetos:
- [[gen_sucursal]]
- [[gen_SucursalConv]]

```sql

CREATE VIEW [dbo].[V_gen_SucursalConv]
AS
SELECT dbo.gen_SucursalConv.cod_suc, dbo.gen_sucursal.nom_suc, dbo.gen_SucursalConv.cod_conv
FROM dbo.gen_SucursalConv WITH(NOLOCK)
	INNER JOIN dbo.gen_sucursal WITH(NOLOCK) ON dbo.gen_SucursalConv.cod_suc = dbo.gen_sucursal.cod_suc;

```
