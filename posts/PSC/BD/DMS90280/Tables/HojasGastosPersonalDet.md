# Table: HojasGastosPersonalDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkHojasGastoPersonal | int | NO |
| PkHojasGastosPersonalDet_Iden | tinyint | NO |
| Fecha | datetime | NO |
| FkGastosPersonalConceptos | nvarchar | NO |
| FkPagoFormas | nvarchar | NO |
| Importe | decimal | NO |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCentros_Plantillas | smallint | YES |
| FkPlantillas | nvarchar | YES |
| FkTerceros | int | YES |
| FkAñoAlbaranesComprasDiversas | nvarchar | YES |
| FkSeries_AlbaranesComprasDiversas | nvarchar | YES |
| FkAlbaranesComprasDiversas | nvarchar | YES |
| FkAñoAsiento_Liquidacion | nvarchar | YES |
| FkAsientos_Liquidacion | int | YES |
| FkNumeroTarjeta | nvarchar | YES |
| FkAñoAsiento_FacturaVinculada | nvarchar | YES |
| FkAsientos_FacturaVinculada | int | YES |
| FkAñoAsiento_LiquidacionTarjeta | nvarchar | YES |
| FkAsientos_LiquidacionTarjeta | int | YES |
| Observaciones | nvarchar | YES |
| FkAsientos_LiquidacionCompra | int | YES |
| FkAñoAsiento_LiquidacionCompra | nvarchar | YES |
| FechaFactura | datetime | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FkTerceros_Factura | int | YES |
| NumAutorizacion | nvarchar | YES |
| SufijoFactura | nvarchar | YES |
| FactorCambioMonedaContravalor | decimal | YES |
