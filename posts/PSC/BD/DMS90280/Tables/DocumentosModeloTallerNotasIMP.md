# Table: DocumentosModeloTallerNotasIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkDocumentosModeloTallerNotasIMP | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| LineaNota | nvarchar | YES |
| TextoNota | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
