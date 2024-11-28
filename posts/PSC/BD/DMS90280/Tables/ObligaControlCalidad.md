# Table: ObligaControlCalidad

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCargoTipos | nvarchar | NO |
| PkObligaControlCalidad_Iden | smallint | NO |
| FkImputacionTipos | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ControlCalidad | bit | NO |
| RecorridoPrueba | bit | NO |
