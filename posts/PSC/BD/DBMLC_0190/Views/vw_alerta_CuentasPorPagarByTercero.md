# View: vw_alerta_CuentasPorPagarByTercero

## Usa los objetos:
- [[Empresas]]
- [[vw_alerta_CuentasPorPagarByTercero_Pre]]

```sql






CREATE VIEW [dbo].[vw_alerta_CuentasPorPagarByTercero]
AS
SELECT        

vw_alerta_CuentasPorPagarByTercero_Pre.Ano_Periodo, 
vw_alerta_CuentasPorPagarByTercero_Pre.Mes_Periodo, 
vw_alerta_CuentasPorPagarByTercero_Pre.IdEmpresas, 
dbo.Empresas.NombreEmpresa AS Empresa, 
dbo.Empresas.SiglaEmpresa, 
IDSpiga, 
MAX(Tercero) AS Tercero, 
SUM(Valor) AS Valor

FROM            vw_alerta_CuentasPorPagarByTercero_Pre INNER JOIN
                         dbo.Empresas ON vw_alerta_CuentasPorPagarByTercero_Pre.IdEmpresas = dbo.Empresas.CodigoEmpresa

GROUP BY 
vw_alerta_CuentasPorPagarByTercero_Pre.Ano_Periodo, 
vw_alerta_CuentasPorPagarByTercero_Pre.Mes_Periodo, 
vw_alerta_CuentasPorPagarByTercero_Pre.IdEmpresas, 
vw_alerta_CuentasPorPagarByTercero_Pre.IDSpiga, 
dbo.Empresas.NombreEmpresa, 
dbo.Empresas.SiglaEmpresa


```
