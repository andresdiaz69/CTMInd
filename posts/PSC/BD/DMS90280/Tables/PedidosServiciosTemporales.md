# Table: PedidosServiciosTemporales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPedidosServiciosTemporales_Iden | bigint | NO |
| FechaAlta | datetime | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | YES |
| SerieExpediente | nvarchar | NO |
| NumExpediente | int | NO |
| AñoExpediente | nvarchar | NO |
| ValorNeto | decimal | YES |
| FkMonedas | smallint | YES |
| Descripcion | nvarchar | YES |
| FkMarcas | smallint | YES |
| FkTallerKits | nvarchar | YES |
| FkEntidades | nvarchar | YES |
| FkTipoPedidosServicios | smallint | YES |
| FkTerceros | int | YES |
| FkCompraGastoAdicionalTipos | nvarchar | YES |
| FkDepartamentos | nvarchar | YES |
| FkSecciones_Destino | int | YES |
| FkCentros_Origen | smallint | YES |
| FkSecciones_Origen | int | YES |
| FkImputacionTipos | smallint | YES |
| FechaProcesado | datetime | YES |
| FechaBaja | datetime | YES |
| ObservacionesProceso | nvarchar | YES |
| Origen | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FactorCambioMoneda | decimal | YES |
| FkModulos | nvarchar | YES |
| FkEmpleados | smallint | YES |
