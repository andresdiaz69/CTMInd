# Table: spiga_RentabilidadDetalladaVehiculosUsados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| SerieExpediente | nvarchar | YES |
| NumExpediente | int | YES |
| AñoExpediente | nvarchar | YES |
| NumVenta | smallint | YES |
| IdVentasAbonado | smallint | YES |
| NombreCentro | nvarchar | YES |
| Seccion | nvarchar | YES |
| Marca | nvarchar | YES |
| Gama | nvarchar | YES |
| CodModelo | nvarchar | YES |
| Modelo | nvarchar | YES |
| VIN | nvarchar | YES |
| TipoCompra | nvarchar | YES |
| IdTercerosCompra | int | YES |
| NombreTerceroCompra | nvarchar | YES |
| Apellido1TerceroCompra | nvarchar | YES |
| Apellido2TerceroCompra | nvarchar | YES |
| FechaFacturaCompra | datetime | YES |
| SerieFacturaCompra | nvarchar | YES |
| NumFacturaCompra | nvarchar | YES |
| AñoFacturaCompra | nvarchar | YES |
| DiasStock | int | YES |
| TipoVenta | nvarchar | YES |
| FechaVenta | datetime | YES |
| SerieFacturaVenta | nvarchar | YES |
| NumFacturaVenta | nvarchar | YES |
| AñoFacturaVenta | nvarchar | YES |
| NombreVendedor | nvarchar | YES |
| Apellido1Vendedor | nvarchar | YES |
| Apellido2Vendedor | nvarchar | YES |
| ImporteCompra | decimal | YES |
| ImporteGasto | decimal | YES |
| IdCompraGastoAdicionalTipos | nvarchar | YES |
| IdCompraGastoAdicionalTiposDescripcion | nvarchar | YES |
| OtrosCargos | decimal | YES |
| OtrosIngresos | decimal | YES |
| ImporteVenta | decimal | YES |
| ImporteSeguros | decimal | YES |
| ImporteGarantias | decimal | YES |
| ImporteMatriculacion | decimal | YES |
| ImporteTransferencia | decimal | YES |
| ImportePrestamo | decimal | YES |
| matricula | nvarchar | YES |
| FechaAbono | datetime | YES |
| ImporteProvisionadoGarantias | decimal | YES |