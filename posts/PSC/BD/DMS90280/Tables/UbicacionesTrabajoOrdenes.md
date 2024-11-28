# Table: UbicacionesTrabajoOrdenes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkFechaUbicacion | datetime | NO |
| FkUbicaTaller | nvarchar | YES |
| FechaPrevista | datetime | YES |
| FechaRealizacion | datetime | YES |
| FkUsuarios_Realizacion | smallint | YES |
| FkUsuarios_Alta | smallint | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
