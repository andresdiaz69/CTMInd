# Table: PedidosComprasDiversasDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoPedido | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkPedidosComprasDiversas | int | NO |
| PkPedidosComprasDiversasDet_Iden | int | NO |
| FkArticulos | int | YES |
| Unidades | decimal | NO |
| PrecioUnitario | decimal | NO |
| DtoPorc | decimal | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| Observaciones | nvarchar | YES |
| FkImpuestos | nvarchar | YES |
| PorcImpuestos | decimal | YES |
| NumeroContrato | nvarchar | YES |
| NumeroUnidadesEnvase | decimal | YES |
| FechaEstimadaEntrega | datetime | YES |
| FkCentros_Entrega | smallint | YES |
| NombreEmpleadoEntrega | nvarchar | YES |
| FkContCtas | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| NumeroDetalleExterno | int | YES |
| Descripcion | nvarchar | YES |
| ImporteExento | decimal | YES |
| FkUnidadesMedida | int | YES |
| UnidadesRecibidas | decimal | YES |
| FkArticulosTipos | int | YES |
| PrecioFijado | bit | NO |
| FkImpuestos_Secundario | nvarchar | YES |
| PorcImpuestoSecundario | decimal | YES |
| ImporteNoSujeto | decimal | YES |
