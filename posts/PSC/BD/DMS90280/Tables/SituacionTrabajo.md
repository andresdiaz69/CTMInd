# Table: SituacionTrabajo

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkSituacionTrabajo | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| PkFkEmpresas | smallint | NO |
| FechaMod | datetime | NO |
| FkSituacionTrabajoTipos | nvarchar | NO |
| Color | nvarchar | NO |
| FkTallerEstadoTrabajos | nvarchar | YES |