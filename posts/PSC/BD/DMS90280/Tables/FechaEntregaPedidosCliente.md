# Table: FechaEntregaPedidosCliente

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMR | nvarchar | NO |
| PkFkPedidoTipoVentas | smallint | NO |
| PkFechaEntregaPedidosCliente_Iden | smallint | NO |
| HoraDesde | datetime | YES |
| HoraHasta | datetime | YES |
| StockDisponible | bit | NO |
| DiasEntrega | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
