# Table: EmpleadoFormaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpleados | smallint | NO |
| PkEmpleadoFormaciones_Iden | int | NO |
| CentroFormacion | nvarchar | YES |
| FechaDesde | datetime | YES |
| FechaHasta | datetime | YES |
| Horas | decimal | YES |
| Titulo | nvarchar | NO |
| Complementaria | bit | NO |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
