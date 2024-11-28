# Table: PedidoOpcionalesIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPedidoOpcionalesIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkFicheros | smallint | YES |
| FkProcesos | int | YES |
| FkMarcas | smallint | YES |
| FkNumPedidoVN | nvarchar | YES |
| CodConcesionarioVN | nvarchar | YES |
| FkOpcionales | nvarchar | YES |
| FkOpcionalTipos | nvarchar | YES |
| Descripcion | nvarchar | YES |
| PrecioVenta | decimal | YES |
| Serie | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkPedidosIMP | bigint | YES |
| NumLineaFichero | int | YES |
| OpcionalPinturaTipos | nvarchar | YES |
| PrecioCompra | decimal | YES |
| Dato1 | nvarchar | YES |
