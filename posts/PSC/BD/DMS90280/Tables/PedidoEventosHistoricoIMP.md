# Table: PedidoEventosHistoricoIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPedidoEventosHistoricoIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FKIntegracion | smallint | YES |
| FkFicheros | smallint | YES |
| FkProcesos | int | YES |
| FkMarcas | smallint | YES |
| FkNumPedidoVN | nvarchar | YES |
| CodConcesionarioVN | nvarchar | YES |
| FkPedidoEventos | nvarchar | YES |
| FechaEvento | datetime | YES |
| DescripcionEvento | nvarchar | YES |
| FkPedidosIMP | bigint | YES |
| NumLineaFichero | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
