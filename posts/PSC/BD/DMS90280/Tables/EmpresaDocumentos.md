# Table: EmpresaDocumentos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkDocumentos | nvarchar | NO |
| FkModulos | nvarchar | NO |
| FkInformes | smallint | NO |
| NumCopias | smallint | NO |
| FkArchivos | int | YES |
| FechaArchivo | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
