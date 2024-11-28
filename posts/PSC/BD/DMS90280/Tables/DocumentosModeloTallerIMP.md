# Table: DocumentosModeloTallerIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkDocumentosModeloTallerIMP | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| Marca | nvarchar | YES |
| ModeloTaller | nvarchar | YES |
| CodMO | nvarchar | YES |
| KM | int | YES |
| Posicion | nvarchar | YES |
| Orden | smallint | YES |
| LineaTarea | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| LineaNota | nvarchar | YES |
