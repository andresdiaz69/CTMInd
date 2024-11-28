# View: vw_alerta_ContabilidadByCuentaCuentasPorCobrar

## Usa los objetos:
- [[alertas_CuadresOperativosCuentas]]
- [[Empresas]]
- [[vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose]]

```sql











CREATE VIEW [dbo].[vw_alerta_ContabilidadByCuentaCuentasPorCobrar]
AS
SELECT        
vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.Ano_Periodo, 
vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.Mes_Periodo, 
vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.IdEmpresas, 
dbo.Empresas.NombreEmpresa AS Empresa, 
dbo.Empresas.SiglaEmpresa, 
vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.TerceroBanco AS IDSpiga, 
MAX(Cuenta) AS Cuenta, 
SUM(Saldo) AS Saldo

FROM            
vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose 
INNER JOIN
dbo.Empresas ON vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.IdEmpresas = dbo.Empresas.CodigoEmpresa

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
vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.IdEmpresas, 
vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.TerceroBanco, 
vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.Ano_Periodo, 
vw_alerta_ContabilidadBalanceSumasSaldosSinDesglose.Mes_Periodo, 
dbo.Empresas.NombreEmpresa, 
dbo.Empresas.SiglaEmpresa


```
