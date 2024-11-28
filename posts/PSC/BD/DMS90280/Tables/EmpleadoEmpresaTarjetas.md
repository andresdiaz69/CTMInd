# Table: EmpleadoEmpresaTarjetas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpleados | smallint | NO |
| PkFkEmpresas | smallint | NO |
| PkNumeroTarjeta | nvarchar | NO |
| FechaCaducidad | datetime | NO |
| FkTarjetaTipos | nvarchar | YES |
| FkContCtas | nvarchar | NO |
| FkCtaBancarias | smallint | YES |
| FkConceptosBancarios | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
