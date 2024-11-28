# Table: DMSAcciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkDMSAcciones_Iden | smallint | NO |
| Accion | nvarchar | NO |
| FkModulos | nvarchar | NO |
| Sincrona | bit | NO |
| RompeTransaccion | bit | NO |
| Descripcion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
