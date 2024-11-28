# Table: EmpresaCentroSeccionesEmpleados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| PkEmpresaCentroSeccionesEmpleados_Iden | int | NO |
| FkSecciones | int | YES |
| FkCentros_Destino | smallint | NO |
| FkEmpleados_Destino | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpleados | smallint | YES |
