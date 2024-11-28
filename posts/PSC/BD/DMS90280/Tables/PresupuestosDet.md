# Table: PresupuestosDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoPresupuesto | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumPresupuesto | int | NO |
| PkPresupuestosDet_Iden | int | NO |
| FechaAlta | datetime | NO |
| FkMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| Unidades | decimal | NO |
| Precio | decimal | NO |
| PorcDto | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkAñoPedidoCliente | nvarchar | YES |
| FkSeries_PedidoCliente | nvarchar | YES |
| FkPedidoCliente | int | YES |
| FkPedidoClienteDet | int | YES |
| GastosAdicionales | decimal | YES |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | NO |
| Observaciones | nvarchar | YES |
| Descripcion | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkCentros | smallint | YES |
| FkRecambiosKits | nvarchar | YES |
| FkVehiculos | int | YES |
| VIN | nvarchar | YES |
| Matricula | nvarchar | YES |
| Sobretasa | decimal | YES |
| IncrementoPVP | decimal | YES |
