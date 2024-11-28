# Table: Vales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkVales_Iden | int | NO |
| FkEmpleados_Solicita | smallint | NO |
| FkEmpleados_Autoriza | smallint | YES |
| Fecha | datetime | NO |
| Importe | decimal | NO |
| Concepto | nvarchar | NO |
| FkValeEstados | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaAbono | datetime | YES |
| FechaMod | datetime | NO |
