# Table: PedidoClienteDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoPedidoCliente | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkPedidoCliente | int | NO |
| PkPedidoClienteDet_Iden | int | NO |
| FkMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| Unidades | decimal | NO |
| Precio | decimal | NO |
| DtoPorc | decimal | NO |
| FechaAlta | datetime | NO |
| FechaValidez | datetime | NO |
| UnidadesReservadas | decimal | YES |
| UnidadesSatisfechas | decimal | NO |
| FkAñoOT | nvarchar | YES |
| FkNumOT | int | YES |
| FkSeries_OT | nvarchar | YES |
| FkNumTrabajo | tinyint | YES |
| UnidadesAPedir | decimal | NO |
| Accion | nvarchar | NO |
| FechaPedidoProv | datetime | YES |
| FkPlazoEntrega | tinyint | NO |
| FechaEntrega | datetime | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkAñoPresupuesto | nvarchar | YES |
| FkSeries | nvarchar | YES |
| FkNumPresupuesto | int | YES |
| FkPresupuestoNumDet | smallint | YES |
| FkVehiculos | int | YES |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | NO |
| VIN | nvarchar | YES |
| Descripcion | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkRecambiosKits | nvarchar | YES |
| FkMR_Pedida | nvarchar | YES |
| FkReferencias_Pedida | nvarchar | YES |
| FkMotivosErrorSalidas | tinyint | YES |
| ComentariosError | nvarchar | YES |
| FkMotivosVentaPerdida | nvarchar | YES |
| FkMarcas_Kit | smallint | YES |
| TallerKits | nvarchar | YES |
| Sobretasa | decimal | YES |
| CodigoLlaves | nvarchar | YES |
| Observaciones | nvarchar | YES |
| Kmts | int | YES |
| VehiculoInmovilizado | bit | NO |
| UnidadesPtesPedir | decimal | YES |
| Matricula | nvarchar | YES |
| NombreModelo | nvarchar | YES |
| StockActual | decimal | YES |
| IncrementoPVP | decimal | YES |
