# Table: VehiculoComponentes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkVehiculoComponentes_Iden | smallint | NO |
| NumeroComponente | nvarchar | NO |
| Descripcion | nvarchar | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| FkFabricantes | smallint | YES |
| FechaFabricacion | datetime | YES |
| FechaInicioGarantiaPropia | datetime | YES |
| FechaFinGarantiaPropia | datetime | YES |
| FechaInicioGarantiaFabrica | datetime | YES |
| FechaFinGarantiaFabrica | datetime | YES |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkCompraGastoAdicionales | int | YES |
| FechaFactura | datetime | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCompraGastoAdicionalDetalles | int | YES |
