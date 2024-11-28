# Table: ModelosCarroceriasIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkModelosCarroceriasIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkFicheros | smallint | YES |
| FkProcesos | int | YES |
| FkMarcas | smallint | YES |
| ModeloCarroceria | nvarchar | YES |
| Nombre | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
