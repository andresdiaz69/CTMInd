# Table: FacturasImportadasNotificaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| PkFkFacturasImportadas | int | NO |
| PkFacturasImportadasNotificaciones_Iden | int | NO |
| FechaNotificacion | datetime | NO |
| Notificacion | nvarchar | YES |
| TipoNotificacion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
