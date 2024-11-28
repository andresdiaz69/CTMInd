# View: vw_alerta_CuentasPorCobrarByTerceroCentro

## Usa los objetos:
- [[Empresas]]
- [[vw_alerta_CuentasPorCobrar]]

```sql

CREATE VIEW [dbo].[vw_alerta_CuentasPorCobrarByTerceroCentro]
AS
SELECT        

vw_alerta_CuentasPorCobrar.Ano_Periodo, 
vw_alerta_CuentasPorCobrar.Mes_Periodo, 
vw_alerta_CuentasPorCobrar.IdEmpresas AS CodigoEmpresa, 
dbo.Empresas.NombreEmpresa, 
dbo.Empresas.SiglaEmpresa,
vw_alerta_CuentasPorCobrar.NombreCentro,
IDSpiga AS CodigoTercero, 
MAX(Tercero) AS NombreTercero, 
SUM(Valor) AS Valor

FROM            vw_alerta_CuentasPorCobrar INNER JOIN
                         dbo.Empresas ON vw_alerta_CuentasPorCobrar.IdEmpresas = dbo.Empresas.CodigoEmpresa

GROUP BY 
vw_alerta_CuentasPorCobrar.Ano_Periodo, 
vw_alerta_CuentasPorCobrar.Mes_Periodo, 
vw_alerta_CuentasPorCobrar.IdEmpresas, 
vw_alerta_CuentasPorCobrar.IDSpiga, 
vw_alerta_CuentasPorCobrar.NombreCentro,
dbo.Empresas.NombreEmpresa, 
dbo.Empresas.SiglaEmpresa


```
