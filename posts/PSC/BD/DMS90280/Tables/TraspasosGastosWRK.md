# Table: TraspasosGastosWRK

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoTraspaso | nvarchar | NO |
| PkFkSeries_Traspaso | nvarchar | NO |
| PkFkNumTraspaso | int | NO |
| PkTraspasosGastos_Iden | tinyint | NO |
| FkGastosTipos | nvarchar | NO |
| FkTerceros_Proveedor | int | NO |
| FkSeries_Factura | nvarchar | YES |
| FkNumFactura | nvarchar | YES |
| FkAñoFactura | nvarchar | YES |
| FechaFactura | datetime | YES |
| SerieAlbaran | nvarchar | YES |
| NumAlbaran | nvarchar | YES |
| AñoAlbaran | nvarchar | YES |
| FechaAlbaran | datetime | YES |
| FechaAlta | datetime | NO |
| FkImpuestos | nvarchar | NO |
| PorcImpuesto | decimal | YES |
| ImporteImpuestos | decimal | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FkPagoFormas | nvarchar | YES |
| FechaAsiento | datetime | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| FkMonedas_Factura | smallint | YES |
| FactorCambioMonedaFactura | decimal | YES |
| AplicableAntesDeImpuestos | bit | NO |
| Aranceles | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Importe | decimal | NO |
| FkImpuestos_Arancel | nvarchar | YES |
| PorcImpuesto_Arancel | decimal | YES |
| ImporteImpuestos_Arancel | decimal | YES |
| FkImpuestoTipos_Arancel | nvarchar | YES |
| AfectaACoste | bit | NO |
| PorcImpuesto_ArancelOriginal | decimal | YES |
| ImporteImpuestos_ArancelOriginal | decimal | YES |
| FkMonedas_Intermedia | smallint | YES |
| FactorCambioMonedaAIntermedia | decimal | YES |
| FactorCambioMonedaDesdeIntermedia | decimal | YES |
| TasaNacionalizacion | decimal | YES |
| TasaNacionalizacionAIntermedia | decimal | YES |
| TasaNacionalizacionDesdeIntermedia | decimal | YES |
| FkProrrateoTipos | tinyint | YES |