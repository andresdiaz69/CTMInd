# Table: Liquidaciones_ComercialVNPorAcc

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| CodigoEmpresa | smallint | YES |
| CedulaVendedorRepuestos | bigint | YES |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | NO |
| FechaRetiro | datetime | YES |
| ValorVariableCT | decimal | YES |
| ValorVariableMM | decimal | YES |
| ValorNetoMostrador | decimal | NO |
| BonificacionMostrador | decimal | NO |
| ValorNetoTaller | decimal | NO |
| BonificacionTaller | decimal | NO |
| BonificacionTotal | decimal | YES |
| IdRangoMaestra | smallint | NO |
| IdComisionModeloSub | smallint | NO |
