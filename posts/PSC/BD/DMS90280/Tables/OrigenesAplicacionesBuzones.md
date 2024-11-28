# Table: OrigenesAplicacionesBuzones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkOrigenesAplicacionesBuzones_Iden | smallint | NO |
| ServidorIMAP | nvarchar | NO |
| SSL | bit | NO |
| VSC | bit | NO |
| Email | nvarchar | NO |
| Password | nvarchar | NO |
| FkEmpleados | smallint | NO |
| DiasValidez | tinyint | NO |
| EmailReenvio | nvarchar | YES |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| Local | bit | NO |
| Port | int | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
