# View: vw_alerta_OTByCargo

## Usa los objetos:
- [[vw_alerta_OT]]

```sql
CREATE VIEW [dbo].[vw_alerta_OTByCargo]
AS
SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, NombreEmpresa, SiglaEmpresa, CentroSigla, IDCargoTipo, CargoTipo, DiasRango, SUM(ValorTotal) AS ValorTotal, COUNT(IDCargo) AS Cantidad
FROM            dbo.vw_alerta_OT
GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, NombreEmpresa, SiglaEmpresa, CentroSigla, IDCargoTipo, CargoTipo, DiasRango



```
