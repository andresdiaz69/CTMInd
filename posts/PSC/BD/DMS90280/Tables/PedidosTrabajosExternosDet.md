# Table: PedidosTrabajosExternosDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoPedidosTrabajosExternos | nvarchar | NO |
| PkFkSeriesPedidosTrabajosExternos | nvarchar | NO |
| PkFkNumPedidosTrabajosExternos | int | NO |
| PkPedidosTrabajosExternosDet_Iden | int | NO |
| FkNumTrabajo | tinyint | NO |
| FkArticulos | int | YES |
| Descripcion | nvarchar | YES |
| Unidades | decimal | NO |
| PrecioUnitario | decimal | NO |
| ImporteExento | decimal | YES |
| DtoPorc | decimal | YES |
| FkImpuestos | nvarchar | YES |
| PorcImpuestos | decimal | YES |
| FkCentros | smallint | NO |
| FkSeries | nvarchar | NO |
| FkNumOT | int | NO |
| FkAñoOT | nvarchar | NO |
| Observaciones | nvarchar | YES |
| NumeroContrato | nvarchar | YES |
| FechaEstimadaEntrega | datetime | YES |
| NumeroDetalleExterno | int | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| UnidadesRecibidas | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkArticulosTipos | int | YES |
