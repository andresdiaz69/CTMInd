# Table: EntradasGastosWRK

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoEntradasAlbaran | nvarchar | NO |
| PkFkTerceros | int | NO |
| PkFKSeries_Entradas | nvarchar | NO |
| PkFkNumEntradasAlbaran | nvarchar | NO |
| PkEntradasGastos_Iden | tinyint | NO |
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
| Importe | decimal | NO |
| FkImpuestos | nvarchar | NO |
| PorcImpuesto | decimal | YES |
| ImporteImpuestos | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkPagoFormas | nvarchar | YES |
| FechaAsiento | datetime | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| FkMonedas_Factura | smallint | YES |
| FactorCambioMonedaFactura | decimal | YES |
| AfectaACoste | bit | NO |
| ContabilizarAlTraspasar | bit | NO |
| FkMonedas_Intermedia | smallint | YES |
| FactorCambioMonedaAIntermedia | decimal | YES |
| FactorCambioMonedaDesdeIntermedia | decimal | YES |
| FkProrrateoTipos | tinyint | YES |
