# Table: OperacionesRecomendadasMecanicaRapidaIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkOperacionesRecomendadasMecanicaRapidaIMP | bigint | NO |
| CodigoOperacion | nvarchar | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| FechaMod | datetime | NO |
