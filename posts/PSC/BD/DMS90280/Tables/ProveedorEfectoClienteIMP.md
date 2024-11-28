# Table: ProveedorEfectoClienteIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkProveedorEfectoClienteIMP | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| TipoRegistro | nvarchar | YES |
| Codigo | nvarchar | NO |
| Descripcion | nvarchar | YES |
| OperacionActualizar | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
