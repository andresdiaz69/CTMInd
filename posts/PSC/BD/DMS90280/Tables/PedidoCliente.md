# Table: PedidoCliente

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkAñoPedidoCliente | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkPedidoCliente | int | NO |
| FechaPedido | datetime | NO |
| FkPedidoTipoVentas | smallint | NO |
| FkEmpleados_Usuario | smallint | NO |
| BloquearDto | bit | NO |
| BloquearPvp | bit | NO |
| FkSecciones | int | YES |
| FkTerceros | int | NO |
| ClienteNumPedido | nvarchar | YES |
| PersonaContacto | nvarchar | YES |
| TelefonoContacto | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkTransportesRutas | nvarchar | YES |
| FkEmpleados_VendedorRecambios | smallint | YES |
| Observaciones | nvarchar | YES |
| FechaMod | datetime | NO |
| FkPedidosClienteOrigen | nvarchar | YES |
| FkTerceroDirecciones_Facturacion | smallint | YES |
| FkTerceroDirecciones_Envio | smallint | YES |
| FkCentros_Destino | smallint | YES |
| FkSecciones_Destino | int | YES |
| SuReferencia | nvarchar | YES |
| SatisfacerCompleto | bit | YES |
| Mostrador | bit | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkTerceros_ClienteEnvioMaterial | int | YES |
| FkTerceroDirecciones_ClienteEnvioMaterial | smallint | YES |
| FkTerceroDirecciones_ClienteEnvioFacturacion | smallint | YES |
| Matricula | nvarchar | YES |
| Marca | nvarchar | YES |
| Modelo | nvarchar | YES |
| Color | nvarchar | YES |
| NumPoliza | nvarchar | YES |
| NumSiniestro | nvarchar | YES |
| Franquicia | decimal | YES |
| FkIMSConcesionarios | smallint | YES |
| FkIMSCuentas | smallint | YES |
| FkIMSSucursales | smallint | YES |
| CodExterno | nvarchar | YES |
| UrlExterna | nvarchar | YES |
| ExentoIva | bit | NO |
| Portes | decimal | NO |
| Embalajes | decimal | NO |
| PorcImpuestoPortesEmbalajes | decimal | NO |
| FkImpuestos_PortesEmbalajes | nvarchar | NO |
| PortesEmbalajesExentos | bit | NO |