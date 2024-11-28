# View: vw_alerta_CuentasPorPagarCOResumen

## Usa los objetos:
- [[vw_alerta_ContabilidadCuentasPorPagar]]

```sql






CREATE VIEW [dbo].[vw_alerta_CuentasPorPagarCOResumen]
AS
SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, Empresa, SiglaEmpresa, IDConcepto, Concepto, COUNT(IDSpiga) AS Cantidad, SUM(Saldo) AS Saldo, SUM(Valor) AS Valor, SUM(Diferencia) AS Diferencia 
                        
FROM            dbo.vw_alerta_ContabilidadCuentasPorPagar
GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, Empresa, SiglaEmpresa, IDConcepto, Concepto

```
