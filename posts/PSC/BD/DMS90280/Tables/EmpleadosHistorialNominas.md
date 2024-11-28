# Table: EmpleadosHistorialNominas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkEmpleados | smallint | NO |
| PkFechaEHAlta | datetime | NO |
| FechaBaja | datetime | YES |
| codEmpleadoGestoria | nvarchar | YES |
| codEmpresaGestoria | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
