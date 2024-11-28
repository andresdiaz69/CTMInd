# Table: Liquidaciones_ComercialVNPorPro_Detalle

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdDetalle | bigint | NO |
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| Codigoempresa | smallint | NO |
| Empresa | nvarchar | NO |
| CedulaVendedor | bigint | YES |
| NombreVendedor | nvarchar | YES |
| CodigoEmpleado | bigint | YES |
| FechaRetiro | datetime | YES |
| IdRangoMaestra | smallint | YES |
| IdRangoVersionMax | int | YES |
| NumerEntregasMax | int | YES |
| NumerEntregas | int | YES |
| Centro | nvarchar | NO |
| FechaFactura | datetime2 | NO |
| FechaEntregaCliente | datetime2 | YES |
| TotalFactura | decimal | YES |
| Marca | nvarchar | NO |
| Gama | nvarchar | NO |
| CodigoModelo | nvarchar | NO |
| nombreTercero | nvarchar | YES |
| NumeroFactura | nvarchar | NO |
| VIN | nvarchar | YES |
