# Table: ContsMantenimientoDefectos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkContsMantenimiento | int | NO |
| PkContsMantenimientoDefectos | int | NO |
| PatronCodigoDefecto | nvarchar | NO |
| TipoVehiculo | nvarchar | YES |
| FechaInicio | datetime | YES |
| FechaFin | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCodGrupoDefecto | nvarchar | NO |
