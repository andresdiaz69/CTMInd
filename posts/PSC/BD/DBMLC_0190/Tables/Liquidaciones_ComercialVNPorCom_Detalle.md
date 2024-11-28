# Table: Liquidaciones_ComercialVNPorCom_Detalle

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdDetalle | bigint | NO |
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| Ano_Recaudo | int | YES |
| Mes_Recaudo | int | YES |
| FechaRecaudo | date | YES |
| FechaEntregaCliente | datetime2 | YES |
| FechaPeriodo | datetime2 | YES |
| CodigoEmpresa | smallint | YES |
| Empresa | nvarchar | YES |
| CodigoCentro | smallint | YES |
| FechaFactura | datetime2 | YES |
| NumeroFactura | nvarchar | YES |
| VIN | nvarchar | YES |
| TotalFactura | decimal | YES |
| ImporteEfecto | decimal | YES |
| PorcentajeRecaudo | decimal | YES |
| CodigoMArca | smallint | NO |
| Marca | nvarchar | NO |
| CodigoGama | smallint | NO |
| Gama | nvarchar | NO |
| CodigoModelo | nvarchar | NO |
| AñoModelo | nvarchar | NO |
| Modelo | nvarchar | NO |
| CedulaVendedor | bigint | YES |
| NombreVendedor | nvarchar | YES |
| ValorComision | decimal | YES |
| ModeloVehSinComision | int | NO |
| PrecioLista | decimal | YES |
| ValorDto | decimal | YES |
| PrecioBaseComision | decimal | YES |
