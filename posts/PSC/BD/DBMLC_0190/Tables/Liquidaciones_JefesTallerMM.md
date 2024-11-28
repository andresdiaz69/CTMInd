# Table: Liquidaciones_JefesTallerMM

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | smallint | NO |
| Mes_Periodo | smallint | NO |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| FechaIngreso | datetime | YES |
| FechaRetiro | datetime | YES |
| Rotacion | decimal | NO |
| Comision_Rotacion | decimal | NO |
| Ticket | money | NO |
| Comision_Ticket | decimal | NO |
| Asesoria | decimal | NO |
| Comision_Asesoria | decimal | NO |
| Cumplimiento | decimal | NO |
| Comision_Cumplimiento | decimal | NO |
| Lealtad | decimal | NO |
| Comision_Lealtad | decimal | NO |
| Comision_TOTAL | decimal | YES |
| IdComisionModeloSub | smallint | NO |
