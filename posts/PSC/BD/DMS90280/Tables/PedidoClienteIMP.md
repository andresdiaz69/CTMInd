# Table: PedidoClienteIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPedidoClienteIMP | bigint | NO |
| FkProcesos | int | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| CodCentroRE | nvarchar | YES |
| CodConcesionarioRE | nvarchar | YES |
| FkTerceros | int | YES |
| NumDet | int | YES |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| ClienteNumPedido | nvarchar | YES |
| Precio | decimal | YES |
| DtoPorc | decimal | YES |
| CodISOMoneda | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| Unidades | decimal | YES |
| FkPedidoTipoVentas | smallint | YES |
| TipoPedido | nvarchar | YES |
| Observaciones | nvarchar | YES |
| FechaAlta | datetime | YES |
| OtrosDatos1 | nvarchar | YES |
| OtrosDatos2 | nvarchar | YES |
| OtrosDatos3 | nvarchar | YES |
| FkSecciones | int | YES |
| CodSeccionesEquivalencias | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| CodIncidenciaMarca | nvarchar | YES |
| IncidenciaNotificada | bit | YES |
| FkCentros_Origen | smallint | YES |
| SuReferencia | nvarchar | YES |
| DescripcionTipoPedido | nvarchar | YES |
| DescripcionReferencias | nvarchar | YES |
| VIN | nvarchar | YES |
| UndEnvaseCompra | decimal | YES |
| UndEnvaseVenta | decimal | YES |
| FkDescuentos | nvarchar | YES |
| FkClasificacion1 | nvarchar | YES |
| FkTerceroDirecciones_Facturacion | smallint | YES |
| FkTerceroDirecciones_Envio | smallint | YES |
