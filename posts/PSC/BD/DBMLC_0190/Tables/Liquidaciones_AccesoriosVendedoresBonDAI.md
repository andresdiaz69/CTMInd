# Table: Liquidaciones_AccesoriosVendedoresBonDAI

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| CodigoEmpresa | smallint | YES |
| Empresa | nvarchar | YES |
| CedulaVendedorRepuestos | bigint | YES |
| CodigoEmpleado | bigint | YES |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| ValorVariable | decimal | NO |
| TotalAlmacenAlbaran | decimal | NO |
| TotalTallerPorOT | decimal | NO |
| Total | decimal | YES |
| IdComisionModeloSub | smallint | YES |
| IdRangoMaestra | smallint | YES |
| IdRangoVersionMax | int | YES |
| IdRangoVersion | int | YES |
| ConsecutivoVersion | smallint | YES |
| IdRangoDetalle | int | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| Valor | decimal | YES |
| Comision | decimal | YES |
