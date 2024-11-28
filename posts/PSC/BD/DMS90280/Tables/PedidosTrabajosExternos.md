# Table: PedidosTrabajosExternos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAñoPedidosTrabajosExternos | nvarchar | NO |
| PkFkSeriesPedidosTrabajosExternos | nvarchar | NO |
| PkNumPedidosTrabajosExternos | int | NO |
| FkTerceros | int | NO |
| FkCentros | smallint | NO |
| NumeroPedidoExterno | nvarchar | YES |
| FkOrigenesCompras | tinyint | NO |
| FechaAlta | datetime | NO |
| FechaEnvioProveedor | datetime | YES |
| FkEmpleados | smallint | NO |
| FechaBaja | datetime | YES |
| Observaciones | nvarchar | YES |
| FkWFEntidades | smallint | YES |
| FkWFEstados | smallint | YES |
| FKWFClasificaciones | nvarchar | YES |
| FechaValidez | datetime | YES |
| FechaEstimadaEntrega | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
