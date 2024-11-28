# Table: TasacionesDetalle

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTasacion | int | NO |
| PkFkPartesVehiculo | nvarchar | NO |
| FkParteEstados | smallint | NO |
| ImporteReparacion | decimal | YES |
| Marca | nvarchar | YES |
| Modelo | nvarchar | YES |
| Observacion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkManoObraTipos | smallint | NO |
| FkAcondicionamientoTipos | smallint | YES |
| FechaMod | datetime | NO |
