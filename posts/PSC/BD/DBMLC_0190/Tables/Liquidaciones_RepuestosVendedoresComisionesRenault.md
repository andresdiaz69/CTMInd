# Table: Liquidaciones_RepuestosVendedoresComisionesRenault

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
| ValorBaseMostrador | decimal | NO |
| ValorBaseTaller | decimal | NO |
| ValorBaseTotal | decimal | YES |
| IdRangoMaestra | smallint | YES |
| IdRangoVersionMax | int | YES |
| IdComisionModeloSub | smallint | YES |
| IdRangoVersion | int | YES |
| ConsecutivoVersion | smallint | YES |
| IdRangoDetalle | int | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| Valor | decimal | YES |
| Comision | decimal | YES |
| FechaLiquidacion | datetime | NO |
