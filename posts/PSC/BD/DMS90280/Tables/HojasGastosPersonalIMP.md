# Table: HojasGastosPersonalIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkHojasGastosPersonalIMP | bigint | NO |
| FkProcesos | int | NO |
| FkGastosPersonalMotivos | nvarchar | YES |
| FkTerceros | int | YES |
| FechaDesde | datetime | YES |
| FechaHasta | datetime | YES |
| FkEmpleados | smallint | YES |
| Observaciones | nvarchar | YES |
| FkWFClasificaciones | nvarchar | YES |
| FkWFEntidades | smallint | YES |
| FechaGastoDet | datetime | YES |
| FkGastosPersonalConceptos | nvarchar | YES |
| FkPagoFormas | nvarchar | YES |
| Importe | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkNumeroTarjeta | nvarchar | YES |
| FkTerceros_Det | int | YES |
| ObservacionesDet | nvarchar | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FkTerceros_Factura | int | YES |
| FkArchivos | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
