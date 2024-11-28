# Table: Liquidaciones_RepuestosPIRMM

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| CodigoEmpresa | smallint | YES |
| CodigoEmpleado | bigint | NO |
| FechaRetiro | datetime | YES |
| CodigoSede | smallint | YES |
| NombreSede | nvarchar | YES |
| PIRPorcentaje | decimal | YES |
| PIRPuntos | decimal | YES |
| ValorNetoMostrador | decimal | NO |
| ValorNetoTaller | decimal | NO |
| ValorBasePIR | decimal | YES |
| Faltante | decimal | NO |
| ValorDelPuntoPIR | decimal | YES |
| DiasLaborados | smallint | NO |
| PuntosAsignadosEmpleado | decimal | NO |
| IdComisionModeloSub | smallint | YES |
| IdRangoMaestra | smallint | NO |
| IdRangoVersionMax | int | YES |
| IdRangoVersion | int | YES |
| ConsecutivoVersion | smallint | YES |
| IdRangoDetalle | int | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| Valor | decimal | YES |
| Comision | decimal | YES |
