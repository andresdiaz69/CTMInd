# Table: spiga_InventarioVO

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | NO |
| IdCentros | smallint | YES |
| AñoExpediente | nvarchar | YES |
| SerieExpediente | nvarchar | YES |
| NumExpediente | int | YES |
| ComprasNumDet | smallint | YES |
| FechaDepreciar | datetime | YES |
| VIN | nvarchar | YES |
| Matricula | nvarchar | YES |
| IdSecciones | int | YES |
| IdCompraTipos | nvarchar | YES |
| IdRegistroTipos | nvarchar | YES |
| FechaAsiento | datetime | YES |
| IdCompraInternaTipos | nvarchar | YES |
| DescripcionCompraInternaTipo | nvarchar | YES |
| NombreEmpresa | nvarchar | YES |
| NombreCentro | nvarchar | YES |
| DescripcionSeccion | nvarchar | YES |
| DescripcionTipoCompra | nvarchar | YES |
| DescripcionTipoCombustible | nvarchar | YES |
| TipoCompraInmovilizado | bit | YES |
| IdMarcas | smallint | YES |
| IdGamas | smallint | YES |
| CodModelo | nvarchar | YES |
| ExtModelo | nvarchar | YES |
| AñoModelo | nvarchar | YES |
| NombreMarca | nvarchar | YES |
| NombreGama | nvarchar | YES |
| IdCompraEstados | nvarchar | YES |
| NombreModelo | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| FechaFactura | datetime | YES |
| DescripcionCompraEstados | nvarchar | YES |
| UltimaUbicacionVN | nvarchar | YES |
| UbicacionVNFechaInventario | nvarchar | YES |
| Color | nvarchar | YES |
| Tapiceria | nvarchar | YES |
| BaseImponibleCompra | decimal | YES |
| DepreciacionCompra | decimal | YES |
| Compra576 | decimal | YES |
| Exentos | decimal | YES |
| GastosAumentanStock | decimal | YES |
| GastosNoAumentanStock | decimal | YES |
| GastosPendientesAumentanStock | decimal | YES |
| GastosPendientesNoAumentanStock | decimal | YES |
| TotalGastosContraValor | decimal | YES |
| ImporteCompraContraValor | decimal | YES |
| PedidosSinAsignarAumentaStock | decimal | YES |
| UsoDestino | nvarchar | YES |
| ImporteTotalDepreciado | decimal | YES |
| Observaciones_Compra | nvarchar | YES |
