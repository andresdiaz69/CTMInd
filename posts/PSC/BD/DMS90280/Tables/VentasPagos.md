# Table: VentasPagos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkVentas | smallint | NO |
| PkFkPagosTipos | smallint | NO |
| Fecha | datetime | NO |
| Importe | decimal | NO |
| FkRecibos | int | YES |
| Descripcion | nvarchar | YES |
| FkTerceros_Financiera | int | YES |
| FechaVencimiento | datetime | YES |
| ComisionFinanciera | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| PkVentasPagos_Iden | smallint | NO |
| FkVentasPagos_Anulado | smallint | YES |
| FkEmpleados_Gestor | smallint | YES |
| FechaAnulacion | datetime | YES |
| FkOfertaPagos | smallint | YES |
| SaldoFavorCliente | bit | NO |
| FechaMod | datetime | NO |
| FkAñoFactura_Anticipo | nvarchar | YES |
| FkSeries_Anticipo | nvarchar | YES |
| FkNumFactura_Anticipo | nvarchar | YES |
| CargoCliente | bit | NO |
| FkAñoAsiento_Origen | nvarchar | YES |
| FkAsientos_Origen | int | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FactorCambioMonedaContravalor | decimal | YES |
