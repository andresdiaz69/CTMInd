# Table: PedidosComprasDiversasDetRecepciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoPedido | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkPedidosComprasDiversas | int | NO |
| PkFkPedidosComprasDiversasDet | int | NO |
| PkPedidosComprasDiversasDetRecepciones_Iden | int | NO |
| UnidadesEnviadas | decimal | YES |
| FechaEnvio | datetime | YES |
| UnidadesRecibidas | decimal | YES |
| FechaRecepcion | datetime | YES |
| FechaEstimadaRecepcion | datetime | YES |
| FkEmpleados_Recepcion | smallint | YES |
| NombreEmpleadoRecepcion | nvarchar | YES |
| Observaciones | nvarchar | YES |
| FkMensajesSaphety | int | YES |
| Cerrada | bit | YES |
| FkCentros_Recepcion | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Comentarios | nvarchar | YES |
| UnidadesDescartadas | decimal | YES |
| FkTerceros_Albaran | int | YES |
| FkAñoAlbaranesComprasDiversas | nvarchar | YES |
| FkSeries_AlbaranesComprasDiversas | nvarchar | YES |
| FkAlbaranesComprasDiversas | nvarchar | YES |
| FkAlbaranesComprasDiversasDet | int | YES |
