# Table: _LaFloresta_Mig_PedidoProveedorDet20220504

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoPedidoProveedor | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkPedidoProveedor | int | NO |
| PkPedidoProveedorDet_Iden | int | NO |
| FkMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| Precio | numeric | NO |
| DtoPorc | numeric | NO |
| Unidades | numeric | NO |
| UnidadesDescartadas | numeric | NO |
| UnidadesBackOrder | numeric | NO |
| UnidadesRecibidas | numeric | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| FechaValidez | datetime | NO |
| FechaEntrega | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| UnidadesSugeridas | numeric | YES |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | NO |
| BackOrder | bit | NO |
| Observaciones | nvarchar | YES |
| NumDetPedidoProveedor | nvarchar | YES |
| ObservacionesEstado | nvarchar | YES |
| FkEstadosBackOrder | smallint | YES |
| FechaPropuesta | datetime | YES |
| ObservacionesDet | nvarchar | YES |
