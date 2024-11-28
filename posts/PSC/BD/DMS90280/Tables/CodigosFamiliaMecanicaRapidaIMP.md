# Table: CodigosFamiliaMecanicaRapidaIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCodigosFamiliaMecanicaRapidaIMP | bigint | NO |
| Familia | nvarchar | NO |
| Descripcion | nvarchar | NO |
| GrupoOperacion | nvarchar | NO |
| CodigoPac | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| FechaMod | datetime | NO |
