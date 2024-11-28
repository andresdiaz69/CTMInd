# Table: Liquidaciones_ComercialVNPorAcc_Detalle

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdDetalle | bigint | NO |
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| CodigoEmpresa | smallint | YES |
| CedulaVendedorRepuestos | bigint | YES |
| NumeroFactura | nvarchar | YES |
| ValorVariableCT | decimal | YES |
| ValorVariableMM | decimal | YES |
| ValorNetoMostrador | decimal | NO |
| BonificacionMostrador | decimal | NO |
| ValorNetoTaller | decimal | NO |
| BonificacionTaller | decimal | NO |
| BonificacionTotal | decimal | YES |
