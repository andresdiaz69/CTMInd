# Table: VehiculoBaterias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkVehiculoBaterias_Iden | smallint | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| BIN | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| FkVentaFinanciacionTipos | nvarchar | YES |
| FechaInicioGarantia | datetime | YES |
| FechaFactura | datetime | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
