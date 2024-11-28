# Table: CodigosIncidenteDetBMWIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCodigosIncidenteDetBMWIMP | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| Producto | nvarchar | YES |
| CodigoDefecto | nvarchar | YES |
| CodigoLenguaje | nvarchar | YES |
| Descripcion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
