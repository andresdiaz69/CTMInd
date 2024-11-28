# Table: GruposOperacionesMecanicaRapidaIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkGruposOperacionesMecanicaRapidaIMP | bigint | NO |
| Grupo | nvarchar | NO |
| DescripcionGrupo | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| FechaMod | datetime | NO |
