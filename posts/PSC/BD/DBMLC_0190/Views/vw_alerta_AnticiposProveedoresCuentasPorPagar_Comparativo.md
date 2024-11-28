# View: vw_alerta_AnticiposProveedoresCuentasPorPagar_Comparativo

## Usa los objetos:
- [[vw_alerta_AnticiposProveedores]]
- [[vw_alerta_CuentasPorPagarByTerceroCentro]]

```sql




CREATE VIEW [dbo].[vw_alerta_AnticiposProveedoresCuentasPorPagar_Comparativo]
AS
SELECT        dbo.vw_alerta_AnticiposProveedores.Ano_Periodo, dbo.vw_alerta_AnticiposProveedores.Mes_Periodo, dbo.vw_alerta_AnticiposProveedores.CodigoEmpresa, 
                         dbo.vw_alerta_AnticiposProveedores.NombreEmpresa, dbo.vw_alerta_AnticiposProveedores.SiglaEmpresa, 
						 
						 dbo.vw_alerta_AnticiposProveedores.CodigoTercero, 
                         dbo.vw_alerta_AnticiposProveedores.NombreTercero, 
						 dbo.vw_alerta_AnticiposProveedores.TerceroCompleto,
						 
						 
						 dbo.vw_alerta_AnticiposProveedores.CodigoCentro, dbo.vw_alerta_AnticiposProveedores.NombreCentro, 
                         ISNULL(dbo.vw_alerta_AnticiposProveedores.SaldoPendientePorVincular, 0) AS SaldoPendientePorVincular, ISNULL(dbo.vw_alerta_CuentasPorPagarByTerceroCentro.Valor, 0) AS Valor, 
                         ISNULL(dbo.vw_alerta_AnticiposProveedores.SaldoPendientePorVincular, 0) - ISNULL(dbo.vw_alerta_CuentasPorPagarByTerceroCentro.Valor, 0) AS Diferencia
FROM            dbo.vw_alerta_AnticiposProveedores INNER JOIN
                         dbo.vw_alerta_CuentasPorPagarByTerceroCentro ON dbo.vw_alerta_AnticiposProveedores.Ano_Periodo = dbo.vw_alerta_CuentasPorPagarByTerceroCentro.Ano_Periodo AND 
                         dbo.vw_alerta_AnticiposProveedores.Mes_Periodo = dbo.vw_alerta_CuentasPorPagarByTerceroCentro.Mes_Periodo AND 
                         dbo.vw_alerta_AnticiposProveedores.CodigoEmpresa = dbo.vw_alerta_CuentasPorPagarByTerceroCentro.CodigoEmpresa AND 
                         dbo.vw_alerta_AnticiposProveedores.NombreCentro = dbo.vw_alerta_CuentasPorPagarByTerceroCentro.NombreCentro AND 
                         dbo.vw_alerta_AnticiposProveedores.CodigoTercero = dbo.vw_alerta_CuentasPorPagarByTerceroCentro.CodigoTercero

```
