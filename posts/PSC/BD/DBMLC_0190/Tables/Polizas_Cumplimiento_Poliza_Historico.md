# Table: Polizas_Cumplimiento_Poliza_Historico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdPolizaCumplimientoHistorico | bigint | NO |
| IdPolizasPolizasCumplimiento | int | NO |
| IdPolizasSolicitudes | int | NO |
| NumeroPoliza | varchar | YES |
| CodigoEmpleado | bigint | YES |
| FechaDesde | date | YES |
| FechaHasta | date | YES |
| ValorPrima | decimal | YES |
| ScanearPoliza | varchar | YES |
| NumeroPagos | varchar | YES |
| FechaAutorizacionPago | date | YES |
| FechaPagoPoliza | date | YES |
| EstadoEntrada | varchar | YES |
| NumAsientoCancelado | varchar | YES |
| IdPolizasEstados | int | NO |
