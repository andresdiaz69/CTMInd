# Table: Liquidaciones_ComercialVNPorPro

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| Codigoempresa | smallint | NO |
| Empresa | nvarchar | NO |
| CedulaVendedor | bigint | YES |
| CodigoEmpleado | bigint | YES |
| NombreVendedor | nvarchar | YES |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| IdRangoMaestra | smallint | YES |
| IdRangoVersionMax | int | YES |
| NumerEntregas | int | YES |
| IdComisionModeloSub | smallint | YES |
| IdRangoVersion | int | YES |
| ConsecutivoVersion | smallint | YES |
| IdRangoDetalle | int | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| Valor | decimal | YES |
| ComisionProductividad | decimal | YES |
