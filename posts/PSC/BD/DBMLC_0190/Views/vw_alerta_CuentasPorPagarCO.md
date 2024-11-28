# View: vw_alerta_CuentasPorPagarCO

## Usa los objetos:
- [[alertas_CuadresOperativosCuentas]]
- [[Empresas]]
- [[vw_alerta_ContabilidadCuentasPorPagar_Pre]]
- [[vw_alerta_CuentasPorPagarByEmpresa]]

```sql









CREATE VIEW [dbo].[vw_alerta_CuentasPorPagarCO]
AS
SELECT        

dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.Ano_Periodo, 
dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.Mes_Periodo, 
dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.IdEmpresas, 
dbo.Empresas.NombreEmpresa Empresa, 
dbo.Empresas.SiglaEmpresa, 
                         
(SUM(dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.Saldo) * -1) AS SaldoContabilidad, 
ISNULL(dbo.vw_alerta_CuentasPorPagarByEmpresa.Valor, 0) AS ValorCuentasPorPagar,						 
(SUM(dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.Saldo) * -1) - ISNULL(dbo.vw_alerta_CuentasPorPagarByEmpresa.Valor, 0) AS Diferencia

FROM            dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre INNER JOIN
                         dbo.Empresas ON dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.IdEmpresas = dbo.Empresas.CodigoEmpresa LEFT OUTER JOIN
                         dbo.vw_alerta_CuentasPorPagarByEmpresa ON dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.IdEmpresas = dbo.vw_alerta_CuentasPorPagarByEmpresa.IdEmpresas AND 
                         dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.Mes_Periodo = dbo.vw_alerta_CuentasPorPagarByEmpresa.Mes_Periodo AND dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.Ano_Periodo = dbo.vw_alerta_CuentasPorPagarByEmpresa.Ano_Periodo

WHERE        (dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.IdContCtas

IN (

SELECT        NumCuenta
FROM            alertas_CuadresOperativosCuentas
WHERE        (IDCuadreOperativoTipo = 1)

--2105101150,
--2105101220,
--2105201105,
--2120051110,
--2120051115,
--2120051155,
--2205100505,
--2205151105,
--2210401005,
--2215050510,
--2215050515,
--2335050505,
--2335100505,
--2335200505,
--2335250505,
--2335300505,
--2335350505,
--2335400505,
--2335450505,
--2335500505,
--2335550505,
--2335600505,
--2335650505,
--2335700505,
--2335700510,
--2335950505,
--2365980505,
--2380050505,
--2120051150,
--2120051125,
--2120051130,
--2105101215, 
--2368980505,
--2120051105,
--2120051120,
--2120051135

)) AND (dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.IDSpiga NOT IN (999999, 252485)) -- JCS: 2022/09/21 POR SOLICITUD DE LUISA
AND NOT (dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.IdContCtas = 2380050505 AND dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.IdEmpresas = 3)
AND NOT (dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.IdContCtas = 2365980505 AND dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.IdEmpresas = 3)

GROUP BY 

dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.Ano_Periodo, 
dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.Mes_Periodo, 
dbo.vw_alerta_ContabilidadCuentasPorPagar_Pre.IdEmpresas, 
dbo.Empresas.NombreEmpresa, 
dbo.Empresas.SiglaEmpresa, 
dbo.vw_alerta_CuentasPorPagarByEmpresa.Valor








```
