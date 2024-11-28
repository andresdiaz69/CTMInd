# Table: PedidosComprasDiversasDetImpuestos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoPedido | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkPedidosComprasDiversas | int | NO |
| PkFkPedidosComprasDiversasDet | int | NO |
| PkPedidosComprasDiversasDetImpuestos_Iden | int | NO |
| PorcImpuesto | decimal | YES |
| FkImpuestos | nvarchar | NO |
| FkImpuestoTipos | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Dependiente | bit | NO |
