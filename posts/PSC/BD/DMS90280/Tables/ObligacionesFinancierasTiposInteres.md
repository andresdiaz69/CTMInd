# Table: ObligacionesFinancierasTiposInteres

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkObligacionesFinancierasTipos | tinyint | NO |
| PkFkObligacionesFinancieras | smallint | NO |
| PkObligacionesFinancierasTiposInteres_Iden | tinyint | NO |
| TipoObligacionesFinancierasTiposInteres | tinyint | NO |
| Porc | decimal | YES |
| FechaDesde | datetime | YES |
| FechaHasta | datetime | YES |
| PorcFijo | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
