# View: vw_alerta_CuentasPorPagarByTerceroCentro

## Usa los objetos:
- [[Empresas]]
- [[vw_alerta_CuentasPorPagar]]

```sql







CREATE VIEW [dbo].[vw_alerta_CuentasPorPagarByTerceroCentro]
AS
SELECT        

vw_alerta_CuentasPorPagar.Ano_Periodo, 
vw_alerta_CuentasPorPagar.Mes_Periodo, 
vw_alerta_CuentasPorPagar.IdEmpresas AS CodigoEmpresa, 
dbo.Empresas.NombreEmpresa, 
dbo.Empresas.SiglaEmpresa, 
vw_alerta_CuentasPorPagar.NombreCentro,
IDSpiga AS CodigoTercero,
MAX(Tercero) AS NombreTercero, 
SUM(Valor) AS Valor

FROM            vw_alerta_CuentasPorPagar INNER JOIN
                         dbo.Empresas ON vw_alerta_CuentasPorPagar.IdEmpresas = dbo.Empresas.CodigoEmpresa

GROUP BY 
vw_alerta_CuentasPorPagar.Ano_Periodo, 
vw_alerta_CuentasPorPagar.Mes_Periodo, 
vw_alerta_CuentasPorPagar.IdEmpresas, 
vw_alerta_CuentasPorPagar.IDSpiga, 
vw_alerta_CuentasPorPagar.NombreCentro,
dbo.Empresas.NombreEmpresa, 
dbo.Empresas.SiglaEmpresa


```
