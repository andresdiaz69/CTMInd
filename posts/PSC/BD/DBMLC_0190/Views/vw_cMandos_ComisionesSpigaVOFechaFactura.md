# View: vw_cMandos_ComisionesSpigaVOFechaFactura

## Usa los objetos:
- [[ComisionesSpigaVOFechafactura]]

```sql


CREATE VIEW [dbo].[vw_cMandos_ComisionesSpigaVOFechaFactura]
AS


	SELECT CodigoEmpresa,CodigoCentro, Ano_Periodo, Mes_Periodo, 
		SUM(CASE WHEN PrecioVehiculo<0 THEN -1 ELSE 1 END) AS Cantidad,
		Sum(PrecioVehiculo) PrecioVehiculo,
		SUM(PrecioLista) PrecioLista,
		SUM(ImporteImpuestos) ImporteImpuestos,
		SUM(TotalFactura) TotalFactura
	FROM   dbo.ComisionesSpigaVOFechafactura AS a
	GROUP BY Codigoempresa,CodigoCentro, Ano_Periodo, Mes_Periodo

```
