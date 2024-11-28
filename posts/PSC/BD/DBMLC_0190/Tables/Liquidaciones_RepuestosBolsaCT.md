# Table: Liquidaciones_RepuestosBolsaCT

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| CodigoEmpresa | smallint | YES |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| CodigoSede | smallint | YES |
| NombreSede | nvarchar | YES |
| CodigoCentro | smallint | YES |
| NombreCentro | nvarchar | YES |
| CodigoSeccion | smallint | YES |
| Seccion | nvarchar | YES |
| BolsaPorcentaje | decimal | YES |
| BolsaPuntos | decimal | YES |
| ValorNetoMostrador | decimal | NO |
| ValorNetoTaller | decimal | NO |
| ValorBaseBolsa | decimal | YES |
| ValorDelPuntoBolsa | decimal | YES |
| PuntosAsignadosEmpleado | decimal | NO |
| IdRangoMaestra | smallint | NO |
| IdRangoVersionMax | int | YES |
| IdComisionModeloSub | smallint | YES |
| IdRangoVersion | int | YES |
| ConsecutivoVersion | smallint | YES |
| IdRangoDetalle | int | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| Valor | decimal | YES |
| Comision | decimal | YES |
