# Table: AlbaranesComprasDiversasDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkAñoAlbaranesComprasDiversas | nvarchar | NO |
| PkFkSeries_AlbaranesComprasDiversas | nvarchar | NO |
| PkFkAlbaranesComprasDiversas | nvarchar | NO |
| PkAlbaranesComprasDiversasDet_Iden | int | NO |
| Descripcion | nvarchar | YES |
| FkArticulos | int | YES |
| Unidades | decimal | NO |
| PrecioUnitario | decimal | NO |
| DtoPorc | decimal | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| Observaciones | nvarchar | YES |
| FkImpuestos | nvarchar | YES |
| PorcImpuestos | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| DescripcionMaterial | nvarchar | YES |
| ImporteExento | decimal | YES |
| FkAñoPedidosComprasDiversas | nvarchar | YES |
| FkSeriesPedidosComprasDiversas | nvarchar | YES |
| FkPedidosComprasDiversas | int | YES |
| FkPedidosComprasDiversasDet | int | YES |
| FkArticulosTipos | int | YES |
| PrecioFijado | bit | NO |
| FkImpuestos_Secundario | nvarchar | YES |
| PorcImpuestoSecundario | decimal | YES |
| ImporteNoSujeto | decimal | YES |
