# Table: PedidosComprasDiversasDetDesgloses

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoPedido | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkPedidosComprasDiversas | int | NO |
| PkFkPedidosComprasDiversasDet | int | NO |
| PkPedidosComprasDiversasDetDesgloses_Iden | int | NO |
| Porcentaje | decimal | YES |
| Unidades | decimal | YES |
| Importe | decimal | YES |
| FkCentros | smallint | YES |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMarcas | smallint | YES |
| FkEntidades | nvarchar | YES |
| UnidadesRecibidas | decimal | YES |
