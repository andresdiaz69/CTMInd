# Table: Liquidaciones_RepuestosVendedoresComisionesDAI

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
| ValorVariable | decimal | YES |
| ValorBaseMostrador | decimal | NO |
| ValorBaseTaller | decimal | NO |
| IdComisionModeloSub | smallint | YES |
| IdRangoMaestra | smallint | YES |
| IdRangoVersionMax | int | YES |
| IdRangoVersion | int | YES |
| ConsecutivoVersion | smallint | YES |
| IdRangoDetalle | int | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| Valor | decimal | YES |
| ComisionMostrador | decimal | NO |
| ComisionTaller | decimal | NO |
| Comision | decimal | YES |