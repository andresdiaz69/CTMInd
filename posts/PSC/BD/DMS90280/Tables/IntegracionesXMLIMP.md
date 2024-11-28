# Table: IntegracionesXMLIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkIntegracionesXMLIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkProcesos | int | YES |
| FkIntegracion | smallint | YES |
| FkFicheros | smallint | YES |
| TipoRegistro | nvarchar | NO |
| Datos | xml | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
