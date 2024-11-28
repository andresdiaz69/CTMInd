# Table: Liquidaciones_GerentePostventaMM

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | int | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | smallint | NO |
| Mes_Periodo | smallint | NO |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| FechaIngreso | datetime | YES |
| FechaRetiro | datetime | YES |
| RotacionTrabajo | decimal | NO |
| Comision_RotacionTrabajo | decimal | NO |
| TicketPromedio | money | NO |
| Comision_TicketPromedio | decimal | NO |
| RotacionInventario | decimal | NO |
| Comision_RotacionInventario | decimal | NO |
| UtilidadBruta | decimal | NO |
| Comision_UtilidadBruta | decimal | NO |
| SatisfaccionCliente | decimal | NO |
| Comision_Satisfaccion | decimal | NO |
| Comision_TOTAL | decimal | YES |
| IdComisionModeloSub | smallint | NO |
