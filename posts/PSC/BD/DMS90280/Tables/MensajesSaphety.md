# Table: MensajesSaphety

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkMensajesSaphety | int | NO |
| Contenido | nvarchar | NO |
| FkMensajesSaphetyTipos | tinyint | NO |
| FkMensajesSaphetyEstados | tinyint | NO |
| FechaAlta | datetime | NO |
| MessageId | nvarchar | YES |
| FkEmpresas | smallint | YES |
| FechaIntegracion | datetime | YES |
| ErrorUltimaIntegracion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
