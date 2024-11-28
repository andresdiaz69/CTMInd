# View: vw_alerta_AnticiposClientesPendientesCuentasPorCobrar_Comparativo

## Usa los objetos:
- [[vw_alerta_AnticiposClientesPendientes]]
- [[vw_alerta_CuentasPorCobrarByTerceroCentro]]

```sql


CREATE VIEW [dbo].[vw_alerta_AnticiposClientesPendientesCuentasPorCobrar_Comparativo]
AS
SELECT        dbo.vw_alerta_AnticiposClientesPendientes.Ano_Periodo, dbo.vw_alerta_AnticiposClientesPendientes.Mes_Periodo, dbo.vw_alerta_AnticiposClientesPendientes.CodigoEmpresa, 
                         dbo.vw_alerta_AnticiposClientesPendientes.NombreEmpresa, dbo.vw_alerta_AnticiposClientesPendientes.SiglaEmpresa, 
						 
						 dbo.vw_alerta_AnticiposClientesPendientes.CodigoTercero, 
                         dbo.vw_alerta_AnticiposClientesPendientes.NombreTercero, 
						 dbo.vw_alerta_AnticiposClientesPendientes.TerceroCompleto,
						 
						 dbo.vw_alerta_AnticiposClientesPendientes.CodigoCentro, dbo.vw_alerta_AnticiposClientesPendientes.NombreCentro, 
                         ISNULL(dbo.vw_alerta_AnticiposClientesPendientes.SaldoPendientePorVincular, 0) AS SaldoPendientePorVincular, ISNULL(dbo.vw_alerta_CuentasPorCobrarByTerceroCentro.Valor, 0) AS Valor, 
                         ISNULL(dbo.vw_alerta_AnticiposClientesPendientes.SaldoPendientePorVincular, 0) - ISNULL(dbo.vw_alerta_CuentasPorCobrarByTerceroCentro.Valor, 0) AS Diferencia
FROM            dbo.vw_alerta_AnticiposClientesPendientes INNER JOIN
                         dbo.vw_alerta_CuentasPorCobrarByTerceroCentro ON dbo.vw_alerta_AnticiposClientesPendientes.Ano_Periodo = dbo.vw_alerta_CuentasPorCobrarByTerceroCentro.Ano_Periodo AND 
                         dbo.vw_alerta_AnticiposClientesPendientes.Mes_Periodo = dbo.vw_alerta_CuentasPorCobrarByTerceroCentro.Mes_Periodo AND 
                         dbo.vw_alerta_AnticiposClientesPendientes.CodigoEmpresa = dbo.vw_alerta_CuentasPorCobrarByTerceroCentro.CodigoEmpresa AND 
                         dbo.vw_alerta_AnticiposClientesPendientes.NombreCentro = dbo.vw_alerta_CuentasPorCobrarByTerceroCentro.NombreCentro AND 
                         dbo.vw_alerta_AnticiposClientesPendientes.CodigoTercero = dbo.vw_alerta_CuentasPorCobrarByTerceroCentro.CodigoTercero

```
