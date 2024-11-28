# Table: IncidenciasEmpleados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpleados | smallint | NO |
| PkFkIncidencias | int | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkSecciones | int | YES |
| HorasDuracion | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
