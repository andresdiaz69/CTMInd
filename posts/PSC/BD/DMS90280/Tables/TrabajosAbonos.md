# Table: TrabajosAbonos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkFkNumTrabajo | tinyint | NO |
| PkFkAñoOT_Abono | nvarchar | NO |
| PkFkSeries_Abono | nvarchar | NO |
| PkFkNumOT_Abono | int | NO |
| PkFkNumTrabajo_Abono | tinyint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| PkFkCentros_Abono | smallint | NO |
| FechaMod | datetime | NO |
| FkCentros_Cargo | smallint | YES |
| FkAñoOT_Cargo | nvarchar | YES |
| FkSeries_Cargo | nvarchar | YES |
| FkNumOT_Cargo | int | YES |
| FkNumTrabajo_Cargo | tinyint | YES |
| FkMotivosAbono | nvarchar | YES |
