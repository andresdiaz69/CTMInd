# Table: TransportesRutas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkTransportesRutas | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkSecciones | int | YES |
| FkUbicaciones | nvarchar | YES |
| ImporteFijo | decimal | YES |
