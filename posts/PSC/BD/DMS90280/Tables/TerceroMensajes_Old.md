# Table: TerceroMensajes_Old

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkTerceroMensajes_Iden | smallint | NO |
| Asunto | nvarchar | NO |
| Mensaje | nvarchar | NO |
| FechaDesde | datetime | YES |
| FechaHasta | datetime | YES |
| FkMensajeEstados | tinyint | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaAlta | datetime | YES |
| FechaMod | datetime | NO |
