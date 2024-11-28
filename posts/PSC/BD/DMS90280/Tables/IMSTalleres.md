# Table: IMSTalleres

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkIMSConcesionarios | smallint | NO |
| PkIMSTalleres_Iden | tinyint | NO |
| Descripcion | nvarchar | NO |
| CodTaller | nvarchar | NO |
| FkTerceros | int | YES |
| FkTerceroDirecciones | smallint | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
