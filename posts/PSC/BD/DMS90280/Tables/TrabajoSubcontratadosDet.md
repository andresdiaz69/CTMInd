# Table: TrabajoSubcontratadosDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoTSAlbaran | nvarchar | NO |
| PkFkSerieTSAlbaran | nvarchar | NO |
| PkFkNumTSAlbaran | nvarchar | NO |
| PkFkTerceros | int | NO |
| PkTSDet_Iden | smallint | NO |
| FkAñoOT | nvarchar | NO |
| FkSeries | nvarchar | NO |
| FkNumOT | int | NO |
| FkNumTrabajo | tinyint | NO |
| Denominacion | nvarchar | NO |
| Unidades | decimal | NO |
| PrecioCompra | decimal | NO |
| PorcDescuentoCompra | decimal | NO |
| FkImpuestoTipos_Compra | nvarchar | NO |
| FkImpuestos_Compra | nvarchar | NO |
| PrecioVenta | decimal | NO |
| PorcDescuentoVenta | decimal | NO |
| FkImpuestoTipos_Venta | nvarchar | NO |
| FkImpuestos_Venta | nvarchar | NO |
| ImpuestoPorcCompra | decimal | YES |
| ImpuestoImporteCompra | decimal | YES |
| ImpuestoPorcVenta | decimal | YES |
| ImpuestoImporteVenta | decimal | YES |
| FkManoObraTipos | smallint | NO |
| FkTrabajoSubcontratadoTipos | smallint | YES |
| DescripcionFactura | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ImporteCompraExento | decimal | YES |
| OperacionPrincipal | bit | NO |
| PorcDefC | decimal | YES |
| PorcDefI | decimal | YES |
| FkGarantiaTipos | nvarchar | YES |
| CodAveria | nvarchar | YES |
