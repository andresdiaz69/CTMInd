# Table: DocumentosModeloTallerTextosIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkDocumentosModeloTallerTextosIMP | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| LineaTarea | smallint | YES |
| TextoTarea | nvarchar | YES |
| GrupoTarea | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
