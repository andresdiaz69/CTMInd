# View: vw_cMandos_ComisionesSpigaVNFechaFactura

## Usa los objetos:
- [[ComisionesSpigaVNFechaFactura]]

```sql


CREATE VIEW [dbo].[vw_cMandos_ComisionesSpigaVNFechaFactura]
AS
	SELECT CodigoEmpresa,CodigoCentro, Ano_Periodo, Mes_Periodo, 
		SUM(CASE WHEN PrecioVehiculo<0 THEN -1 ELSE 1 END) AS Cantidad,
		Sum(PrecioVehiculo) PrecioVehiculo,
		sum(PrecioLista) PrecioLista,
		sum(ValorDto) ValorDto,
		sum(ImporteImpuestos) ImporteImpuestos,
		sum(TotalFactura) TotalFactura
	FROM   dbo.ComisionesSpigaVNFechaFactura AS a
	GROUP BY Codigoempresa,CodigoCentro, Ano_Periodo, Mes_Periodo


```
