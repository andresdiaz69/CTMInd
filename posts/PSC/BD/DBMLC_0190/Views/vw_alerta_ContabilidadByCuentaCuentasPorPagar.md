# View: vw_alerta_ContabilidadByCuentaCuentasPorPagar

## Usa los objetos:
- [[alertas_CuadresOperativosCuentas]]
- [[Empresas]]
- [[vw_alerta_ContabilidadCuentasPorPagar_Pre]]

```sql










CREATE VIEW [dbo].[vw_alerta_ContabilidadByCuentaCuentasPorPagar]
AS
SELECT        
vw_alerta_ContabilidadCuentasPorPagar_Pre.Ano_Periodo, 
vw_alerta_ContabilidadCuentasPorPagar_Pre.Mes_Periodo, 
vw_alerta_ContabilidadCuentasPorPagar_Pre.IdEmpresas, 
dbo.Empresas.NombreEmpresa AS Empresa, 
dbo.Empresas.SiglaEmpresa, 
vw_alerta_ContabilidadCuentasPorPagar_Pre.IDSpiga AS IDSpiga, 
MAX(Cuenta) AS Cuenta, 
SUM(Saldo) AS Saldo

FROM            
vw_alerta_ContabilidadCuentasPorPagar_Pre
INNER JOIN
dbo.Empresas ON vw_alerta_ContabilidadCuentasPorPagar_Pre.IdEmpresas = dbo.Empresas.CodigoEmpresa

WHERE        (vw_alerta_ContabilidadCuentasPorPagar_Pre.IdContCtas

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

)) AND (vw_alerta_ContabilidadCuentasPorPagar_Pre.IDSpiga NOT IN (999999, 252485)) -- JCS: 2022/09/21 POR SOLICITUD DE LUISA 
AND NOT (vw_alerta_ContabilidadCuentasPorPagar_Pre.IdContCtas = 2380050505 AND vw_alerta_ContabilidadCuentasPorPagar_Pre.IdEmpresas = 3)
AND NOT (vw_alerta_ContabilidadCuentasPorPagar_Pre.IdContCtas = 2365980505 AND vw_alerta_ContabilidadCuentasPorPagar_Pre.IdEmpresas = 3)

GROUP BY 
vw_alerta_ContabilidadCuentasPorPagar_Pre.IdEmpresas, 
vw_alerta_ContabilidadCuentasPorPagar_Pre.IDSpiga, 
vw_alerta_ContabilidadCuentasPorPagar_Pre.Ano_Periodo, 
vw_alerta_ContabilidadCuentasPorPagar_Pre.Mes_Periodo, 
dbo.Empresas.NombreEmpresa, 
dbo.Empresas.SiglaEmpresa


```
