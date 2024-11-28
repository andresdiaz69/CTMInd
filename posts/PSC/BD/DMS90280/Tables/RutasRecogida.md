# Table: RutasRecogida

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkRutasRecogida | int | NO |
| FkSecciones | int | NO |
| FechaAlta | datetime | NO |
| Estado | tinyint | NO |
| FkEmpleados_Creacion | smallint | NO |
| FkEmpleados_Recogida | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpresas | smallint | YES |
