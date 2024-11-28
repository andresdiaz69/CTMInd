# Table: VentasPagosDetTMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkVentas | smallint | NO |
| PkFkPagosTipos | smallint | NO |
| PkFkVentasPagos | smallint | NO |
| PkVentasPagosDet | smallint | NO |
| Importe | decimal | NO |
| FkPagoFormas | nvarchar | NO |
| FkSeries_Factura | nvarchar | NO |
| FkNumFactura | nvarchar | NO |
| FkAñoFactura | nvarchar | NO |
| FkEfectosNumDet | smallint | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
