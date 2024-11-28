# Table: PedidoClienteDetCodigoDevolucion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPedidoClienteDetCodigoDevolucion | int | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkAñoPedidoCliente | nvarchar | NO |
| FkSeries | nvarchar | NO |
| FkPedidoCliente | int | NO |
| FkPedidoClienteDet | int | NO |
| CodigoDevolucion | nvarchar | NO |
| Unidades | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpresas_Salidas | smallint | YES |
| FkCentros_Salidas | smallint | YES |
| FkAñoSalidasAlbaran | nvarchar | YES |
| FkSeries_Salidas | nvarchar | YES |
| FkNumSalidasAlbaran | nvarchar | YES |
| FkSalidasDet | int | YES |
