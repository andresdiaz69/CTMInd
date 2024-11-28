# Table: ControlPiezasDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkVehiculos | int | NO |
| PkFkControlPiezasFechaAlta | datetime | NO |
| PkControlPiezasDet_Iden | smallint | NO |
| DescripcionPieza | nvarchar | NO |
| UbicacionPieza | nvarchar | YES |
| FechaEntrada | datetime | YES |
| FechaSalida | datetime | YES |
| EmpleadoEntrada | nvarchar | YES |
| EmpleadoSalida | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
