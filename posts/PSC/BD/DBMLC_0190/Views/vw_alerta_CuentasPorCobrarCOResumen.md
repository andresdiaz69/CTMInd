# View: vw_alerta_CuentasPorCobrarCOResumen

## Usa los objetos:
- [[vw_alerta_ContabilidadCuentasPorCobrar]]

```sql







CREATE VIEW [dbo].[vw_alerta_CuentasPorCobrarCOResumen]
AS
SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, Empresa, SiglaEmpresa, IDConcepto, Concepto, COUNT(IDSpiga) AS Cantidad, SUM(Saldo) AS Saldo, SUM(Valor) AS Valor, SUM(Diferencia) AS Diferencia 
                        
FROM            dbo.vw_alerta_ContabilidadCuentasPorCobrar
GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, Empresa, SiglaEmpresa, IDConcepto, Concepto

```
