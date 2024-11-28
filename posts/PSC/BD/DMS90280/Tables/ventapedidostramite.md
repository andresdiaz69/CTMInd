# Table: ventapedidostramite

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkVentas | smallint | NO |
| PkFkAñoPedidosServicios | nvarchar | NO |
| PkFkSeriePedidosServicios | nvarchar | NO |
| PkFkPedidosServicios | int | NO |
| FkTipoPedidosServicios | smallint | NO |
| FkImputacionTipos | smallint | YES |
| FkCompraGastoAdicionalTipos | nvarchar | YES |
| FkImputacionTipos_Modificado | smallint | YES |
| FkCompraGastoAdicionalTipos_Modificado | nvarchar | YES |
| ValorNeto | decimal | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Interno | bit | NO |
| Sobrecoste | bit | NO |
| IncrementaStock | bit | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
