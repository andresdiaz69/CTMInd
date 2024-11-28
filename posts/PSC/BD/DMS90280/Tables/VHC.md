# Table: VHC

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkVHC_Iden | int | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkAñoOT | nvarchar | NO |
| FkSeries_OT | nvarchar | NO |
| FkNumOT | int | NO |
| FkEmpleados_Alta | smallint | NO |
| FechaAlta | datetime | NO |
| Observaciones | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkGradosAveria | smallint | YES |
