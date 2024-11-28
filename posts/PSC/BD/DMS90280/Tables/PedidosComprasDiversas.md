# Table: PedidosComprasDiversas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAñoPedido | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkPedidosComprasDiversas | int | NO |
| FkTerceros | int | NO |
| FkCentros | smallint | NO |
| NumeroPedidoExterno | nvarchar | YES |
| FkOrigenesCompras | tinyint | NO |
| FechaAlta | datetime | NO |
| FechaEnvioProveedor | datetime | YES |
| FkEmpleados | smallint | NO |
| FkPedidosEstados | tinyint | NO |
| FechaBaja | datetime | YES |
| FkMensajesSaphety | int | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkWFEntidades | smallint | YES |
| FkWFEstados | smallint | YES |
| FKWFClasificaciones | nvarchar | YES |
| FechaValidez | datetime | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| ImprimirValorizado | bit | YES |
