# Table: Liquidaciones_RepuestosV2_VendedoresMostradorEItinerantes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| CodigoEmpresa | smallint | NO |
| CedulaVendedorRepuestos | bigint | YES |
| CodigoEmpleado | bigint | YES |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| ValorBaseMostrador | decimal | YES |
| ValorBaseTaller | decimal | YES |
| ValorBaseComision | decimal | YES |
| IdRangoMaestra | smallint | YES |
| IdRangoVersionMax | int | YES |
| IdComisionModeloSub | smallint | YES |
| IdRangoVersion | int | YES |
| ConsecutivoVersion | smallint | YES |
| IdRangoDetalle | int | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| CodigoConcepto | int | YES |
| CodigoConceptoAux | int | YES |
| Valor | decimal | YES |
| Comision | decimal | YES |
