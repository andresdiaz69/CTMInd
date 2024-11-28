# Table: AutorizacionesFacturas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkAutorizacionesFacturas_Iden | smallint | NO |
| SufijoSerie | nvarchar | YES |
| FkSeries | nvarchar | YES |
| NumContadorDesde | int | YES |
| NumContadorHasta | int | YES |
| NumAutorizacion | nvarchar | YES |
| FechaAutorizacionDesde | datetime | YES |
| FechaAutorizacionHasta | datetime | YES |
| TipoAutorizacion | tinyint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| SerieInterna | nvarchar | YES |
| UltimoContadorEnRango | int | YES |
| ClaveTecnica | nvarchar | YES |
| ContadorTacos | int | YES |
