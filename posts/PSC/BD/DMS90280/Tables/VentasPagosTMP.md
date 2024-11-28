# Table: VentasPagosTMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkVentas | smallint | NO |
| PkFkPagosTipos | smallint | NO |
| PkVentasPagos | smallint | NO |
| FkCentros | smallint | NO |
| Fecha | datetime | NO |
| Importe | decimal | NO |
| FkRecibos | int | YES |
| Descripcion | nvarchar | YES |
| FkTerceros_Financiera | int | YES |
| FechaVencimiento | datetime | YES |
| ComisionFinanciera | decimal | YES |
| FkVentasPagos_Anulado | smallint | YES |
| FkEmpleados_Gestor | smallint | YES |
| FechaAnulacion | datetime | YES |
| FkOfertaPagos | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| SaldoFavorCliente | bit | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
