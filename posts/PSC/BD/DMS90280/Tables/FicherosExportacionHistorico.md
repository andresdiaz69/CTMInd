# Table: FicherosExportacionHistorico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkFicherosExportacion | nvarchar | NO |
| PkFkFicherosExportacionConfig | smallint | NO |
| PkFicherosExportacionHistorico | datetime | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FechaDesde | datetime | NO |
| FechaHasta | datetime | NO |
| Ruta | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| NumFicheroGenerado | int | YES |
| FiltrosXML | nvarchar | YES |
| FechaMod | datetime | NO |
| SearchId | nvarchar | YES |
