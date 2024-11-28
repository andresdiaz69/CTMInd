# Table: TallerPicajes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkEmpleados | smallint | NO |
| PkFechaTallerPicajesInicio | datetime | NO |
| FechaFin | datetime | YES |
| FkPicajeTrabajoTipos | nvarchar | YES |
| FkTallerEstadoTrabajos | nvarchar | YES |
| FkRevisionPicajeTipos | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
