# Table: Baterias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkBaterias_Iden | int | NO |
| FkVehiculos | int | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| BIN | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| Observaciones | nvarchar | YES |
| FechaInicioGarantiaFab | datetime | YES |
| FechaFinGarantiaFab | datetime | YES |
| FechaInicioGarantiaPropia | datetime | YES |
| FechaFinGarantiaPropia | datetime | YES |
| FkVentaFinanciacionTipos_Compra | nvarchar | YES |
| FechaFacturaCompra | datetime | YES |
| SerieFacturaCompra | nvarchar | YES |
| NumFacturaCompra | nvarchar | YES |
| AñoFacturaCompra | nvarchar | YES |
| FkVentaFinanciacionTipos_Venta | nvarchar | YES |
| FechaFacturaVenta | datetime | YES |
| SerieFacturaVenta | nvarchar | YES |
| NumFacturaVenta | nvarchar | YES |
| AñoFacturaVenta | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
