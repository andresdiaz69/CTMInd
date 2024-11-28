# Table: RecambiosKits

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkRecambiosKits | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FechaDesde | datetime | NO |
| FechaHasta | datetime | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PrecioCerrado | decimal | YES |
| MantenerPrecioKit | bit | NO |
