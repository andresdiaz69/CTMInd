# Table: FinanciacionTablas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTerceros | int | NO |
| PkFinanciacionTablas | nvarchar | NO |
| FechaInicio | datetime | NO |
| FechaFin | datetime | YES |
| FkModulos | nvarchar | YES |
| IncluyeComision | bit | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
