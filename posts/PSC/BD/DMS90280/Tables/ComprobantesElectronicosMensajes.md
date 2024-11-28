# Table: ComprobantesElectronicosMensajes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkComprobantesElectronicos | int | NO |
| PkComprobantesElectronicosMensajes_Iden | smallint | NO |
| Fecha | datetime | NO |
| Estado | nvarchar | YES |
| Mensaje | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMensajesTipos | tinyint | YES |
| Errores | nvarchar | YES |
| ClaveDocumento | nvarchar | YES |
| XML_Envio_Zip | varbinary | YES |
| XML_Envio | nvarchar | YES |
