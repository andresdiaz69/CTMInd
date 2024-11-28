# Table: AplicacionesDominio

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkAplicaciones | nvarchar | NO |
| PkAplicacionesDominio_Iden | smallint | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkUsuarios_Alta | smallint | YES |
| FechaAlta | datetime | YES |
| FkUsuarios_Baja | smallint | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
