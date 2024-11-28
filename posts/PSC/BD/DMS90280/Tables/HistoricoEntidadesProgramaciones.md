# Table: HistoricoEntidadesProgramaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkHistoricoEntidadesProgramaciones | int | NO |
| FkEntidad | nvarchar | NO |
| FkKeyEntidad | nvarchar | NO |
| FechaOperacionDesde | datetime | YES |
| FechaOperacionHasta | datetime | YES |
| FechaProgramacion | datetime | NO |
| FechaProcesado | datetime | YES |
| FkUsuarios | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Privacidad | bit | YES |
