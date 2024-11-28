# Table: TerceroMensajes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkTerceros | int | NO |
| PkTerceroMensajes_Iden | smallint | NO |
| Asunto | nvarchar | NO |
| Mensaje | nvarchar | NO |
| FkMensajeEstados | tinyint | NO |
| FechaDesde | datetime | YES |
| FechaHasta | datetime | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
