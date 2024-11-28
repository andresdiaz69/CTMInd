# Table: PedidosComprasDiversasCambiosEstado

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoPedido | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkPedidosComprasDiversas | int | NO |
| PkPedidosComprasDiversasCambiosEstado_Iden | int | NO |
| FechaAlta | datetime | NO |
| FkPedidosEstados_Anterior | tinyint | NO |
| FkEmpleados_CambioEstado | smallint | NO |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkWFEstados | smallint | YES |
| FkWFEstados_Anterior | smallint | YES |
| FkWFMotivosRechazo | smallint | YES |
| AutorizadoAutomaticamente | bit | YES |
