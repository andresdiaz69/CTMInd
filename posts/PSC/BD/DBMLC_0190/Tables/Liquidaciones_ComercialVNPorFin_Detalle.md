# Table: Liquidaciones_ComercialVNPorFin_Detalle

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdDetalle | bigint | NO |
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| Vin | nvarchar | YES |
| CodigoMarca | smallint | YES |
| Marca | nvarchar | YES |
| CodigoGama | smallint | YES |
| Gama | nvarchar | YES |
| AñoModelo | nvarchar | YES |
| Modelo | nvarchar | YES |
| ValorNeto | decimal | YES |
| TotalFactura | decimal | YES |
| FechaEntregaCliente | datetime2 | YES |
| NumeroFacturaVehiculo | nvarchar | YES |
| CedulaVendedor | bigint | YES |
| NombreVendedor | nvarchar | YES |
| IdFinanciera | int | YES |
| Financiera | nvarchar | YES |
| BaseImponible | decimal | YES |
| IvaImporte | decimal | YES |
| FechaFacturaFinanciera | datetime | YES |
| IdEmpresas | smallint | YES |
| Empresa | nvarchar | YES |
| Centro | nvarchar | YES |
| Seccion | nvarchar | YES |
| Factura_financiera | nvarchar | YES |
| Documento | nvarchar | YES |
| NombreTercero | nvarchar | YES |
| FechaRetiro | datetime | YES |
| IdRangoMaestra | smallint | YES |
| IdComisionModeloSub | int | YES |
| ComisionPorMillon | bigint | YES |
| VehiculosRecaudados | int | YES |
| CantidadMinimaVH | smallint | YES |
| AplicaComision | bit | YES |
| BaseFinanciacion | decimal | YES |
| ComisionAsesor | decimal | YES |
| ComisionPorMillonEmpleado | bigint | YES |
