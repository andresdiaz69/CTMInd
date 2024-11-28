# Table: AplicacionesMensajes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkAplicaciones | nvarchar | NO |
| PkAplicacionesMensajes | bigint | NO |
| Mensaje | nvarchar | NO |
| FechaAlta | datetime | NO |
| Procedencia | nvarchar | YES |
| TipoMensaje | nvarchar | YES |
| FechaProcesado | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
