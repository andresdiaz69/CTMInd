# Table: DMSEventosAccionesConfig

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkDMSEventosAccionesConfig_Iden | int | NO |
| FkDMSEventos | smallint | NO |
| FkDMSAcciones | smallint | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| Parametros | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| OrdenEjecucion | smallint | YES |
