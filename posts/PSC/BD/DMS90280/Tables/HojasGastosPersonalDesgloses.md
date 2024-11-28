# Table: HojasGastosPersonalDesgloses

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkHojasGastoPersonal | int | NO |
| PkHojasGastosPersonalDesgloses_Iden | tinyint | NO |
| FkEmpleados | smallint | NO |
| FkCentros | smallint | NO |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| Porcentaje | decimal | NO |
| Importe | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEntidades | nvarchar | YES |
| FkMarcas | smallint | YES |
