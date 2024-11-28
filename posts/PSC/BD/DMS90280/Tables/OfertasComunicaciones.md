# Table: OfertasComunicaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkOfertasComunicaciones_Iden | smallint | NO |
| Fecha | datetime | NO |
| Comunicacion | nvarchar | NO |
| FkAplicaciones | nvarchar | YES |
| FkPedidoAplicacionesMensajes | smallint | YES |
| FkOfertaAplicacionesMensajes | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Comunicado | bit | YES |
