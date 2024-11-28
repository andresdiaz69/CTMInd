# Table: spiga_PagosCobros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | int | YES |
| CodTercero | bigint | YES |
| NombreTercero | nvarchar | YES |
| CodTerceroPagador | bigint | YES |
| NombreTerceroPagador | nvarchar | YES |
| Factura | nvarchar | YES |
| SituacionEfecto | nvarchar | YES |
| ValorEfecto | decimal | YES |
| ValorCancelado | decimal | YES |
| FechaCobroPago | datetime | YES |
| FormaPago | nvarchar | YES |
| Centro | nvarchar | YES |
| Procedencia | nvarchar | YES |
| FechaVto | datetime | YES |
| MonedaEfecto | nvarchar | YES |
| ImporteMonedaEfecto | decimal | YES |
| Seccion | nvarchar | YES |
| TipoNegocio | varchar | YES |
| TipoPedido | varchar | YES |
| NumSiniestro | varchar | YES |
| SuReferencia | varchar | YES |
