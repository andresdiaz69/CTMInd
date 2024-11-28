# Table: CampañasMarketingIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCampañasMarketingIMP | bigint | NO |
| FkCampañasMarketing | nvarchar | YES |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| Descripcion | nvarchar | YES |
| FechaActivacionDesde | datetime | YES |
| FechaActivacionHasta | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
