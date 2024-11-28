# Table: PedidoProveedorPedidoClientes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas_Proveedor | smallint | NO |
| PkFkCentros_Proveedor | smallint | NO |
| PkFkAñoPedidoProveedor | nvarchar | NO |
| PkFkSeries_Proveedor | nvarchar | NO |
| PkFkPedidoProveedor | int | NO |
| PkFkPedidoProveedorDet | int | NO |
| PkFkEmpresas_Cliente | smallint | NO |
| PkFkCentros_Cliente | smallint | NO |
| PkFkAñoPedidoCliente | nvarchar | NO |
| PkFkSeries_Cliente | nvarchar | NO |
| PkFkPedidoCliente | int | NO |
| PkFkPedidoClienteDet | int | NO |
| UnidadesAPedir | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| UnidadesBackOrder | decimal | NO |
| FkEstadosBackOrder | smallint | YES |
