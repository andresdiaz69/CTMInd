# Table: ComprobantesElectronicosTemporales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkComprobantesElectronicosTemporales_Iden | int | NO |
| NumeroAutorizacionTemporal | nvarchar | NO |
| FkComprobantesElectronicos | int | YES |
| FechaUtilizacion | datetime | YES |
| NumeroAutorizacion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
