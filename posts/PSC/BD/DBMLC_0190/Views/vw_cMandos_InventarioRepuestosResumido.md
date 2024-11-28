# View: vw_cMandos_InventarioRepuestosResumido

## Usa los objetos:
- [[spiga_stockRepuestos]]

```sql
CREATE VIEW [dbo].[vw_cMandos_InventarioRepuestosResumido]
AS
SELECT IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas CodigoEmpresa, 
	case when IdCentros=28 then (idCentros*1000)+IdSecciones else idCentros end CodigoCentro, 
	IdSecciones CodigoSeccion, IdMR, IdClasificacion1, 
	Stock, PrecioMedio ValorPM, PrecioVenta,StockMax
	IdTarifas
FROM PSCService_DB.dbo.spiga_stockRepuestos 

```
