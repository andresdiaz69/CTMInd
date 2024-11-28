# Table: GrupoDefectosDescripcionIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkGrupoDefectosDescripcionIMP_Iden | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | NO |
| FkFicheros | smallint | YES |
| CodGrupoDefecto | nvarchar | NO |
| Descripcion | nvarchar | YES |
| Inclusion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
