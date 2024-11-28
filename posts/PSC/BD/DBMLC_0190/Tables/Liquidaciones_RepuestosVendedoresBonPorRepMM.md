# Table: Liquidaciones_RepuestosVendedoresBonPorRepMM

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| CodigoEmpresa | smallint | YES |
| CedulaVendedorRepuestos | bigint | YES |
| CodigoEmpleado | bigint | YES |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| CodigoSede | smallint | YES |
| NombreSede | nvarchar | YES |
| ValorVariable_Ven | decimal | NO |
| ValorVariable_Aux | decimal | NO |
| ValorVariable_Jefe | decimal | NO |
| Presupuesto | decimal | YES |
| CumplimientoAl15_OT | decimal | YES |
| CumplimientoAl15_AL | decimal | YES |
| CumplimientoAl15 | decimal | YES |
| PorcentajeCumplimientoAl15 | decimal | YES |
| CumplimientoAl30_OT | decimal | YES |
| CumplimientoAl30_AL | decimal | YES |
| CumplimientoAl30 | decimal | YES |
| PorcentajeCumplimientoAl30 | decimal | YES |
| IdComisionModeloSub | smallint | YES |
| IdRangoMaestra | smallint | YES |
| IdRangoVersionMax | int | YES |
| IdRangoVersion | int | YES |
| ConsecutivoVersion | smallint | YES |
| IdRangoDetalle | int | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| Valor | decimal | YES |
| ComisionAl15 | decimal | NO |
| ComisionAl30 | decimal | YES |
| Comision | decimal | YES |
