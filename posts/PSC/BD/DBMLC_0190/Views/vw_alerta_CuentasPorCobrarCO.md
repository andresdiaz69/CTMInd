# View: vw_alerta_CuentasPorCobrarCO

## Usa los objetos:
- [[alertas_CuadresOperativosCuentas]]
- [[Empresas]]
- [[vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose]]
- [[vw_alerta_CuentasPorCobrarByEmpresa]]

```sql












CREATE VIEW [dbo].[vw_alerta_CuentasPorCobrarCO]
AS
SELECT        

vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.Ano_Periodo, 
vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.Mes_Periodo, 
vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.IdEmpresas, 
dbo.Empresas.NombreEmpresa Empresa, 
dbo.Empresas.SiglaEmpresa, 
                         
SUM(vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.Saldo) AS SaldoContabilidad, 
ISNULL(dbo.vw_alerta_CuentasPorCobrarByEmpresa.Valor, 0) AS ValorCuentasPorCobrar,						 
SUM(vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.Saldo) - ISNULL(dbo.vw_alerta_CuentasPorCobrarByEmpresa.Valor, 0) AS Diferencia

FROM            vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose INNER JOIN
                         dbo.Empresas ON vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.IdEmpresas = dbo.Empresas.CodigoEmpresa LEFT OUTER JOIN
                         dbo.vw_alerta_CuentasPorCobrarByEmpresa ON vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.IdEmpresas = dbo.vw_alerta_CuentasPorCobrarByEmpresa.IdEmpresas AND 
                         vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.Mes_Periodo = dbo.vw_alerta_CuentasPorCobrarByEmpresa.Mes_Periodo AND vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.Ano_Periodo = dbo.vw_alerta_CuentasPorCobrarByEmpresa.Ano_Periodo

WHERE        (vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.IdContCtas

IN (

SELECT        NumCuenta
FROM            alertas_CuadresOperativosCuentas
WHERE        (IDCuadreOperativoTipo = 4)

--1305050505,
--1305050510,
--1305051005,
--1345100505,
--1345150505,
--1345300505,
--1345950505,
--1360050505,
--1360950505,
--1360951005,
--1390052105

)) AND (vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.TerceroBanco NOT IN (0, 999999)) 

GROUP BY 

vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.Ano_Periodo, 
vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.Mes_Periodo, 
vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.IdEmpresas, 
dbo.Empresas.NombreEmpresa, 
dbo.Empresas.SiglaEmpresa, 
dbo.vw_alerta_CuentasPorCobrarByEmpresa.Valor








```
