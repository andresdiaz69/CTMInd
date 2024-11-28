# Table: ErrorLog_Old

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkErrorLog | bigint | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkIdioma | nvarchar | YES |
| Mensaje | nvarchar | NO |
| StackTrace | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaActual | datetime | NO |
| Pidsql | smallint | YES |
