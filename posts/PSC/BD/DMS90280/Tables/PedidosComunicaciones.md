# Table: PedidosComunicaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkNumPedidoVN | nvarchar | NO |
| PkFkMarcas | smallint | NO |
| PkPedidosComunicaciones_Iden | smallint | NO |
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
