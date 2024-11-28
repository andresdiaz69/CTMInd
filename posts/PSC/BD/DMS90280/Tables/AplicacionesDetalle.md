# Table: AplicacionesDetalle

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkAplicaciones | nvarchar | NO |
| PkAplicacionesDetalle_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PkFkAplicacionesDominio | smallint | NO |
| FechaBaja | datetime | YES |
