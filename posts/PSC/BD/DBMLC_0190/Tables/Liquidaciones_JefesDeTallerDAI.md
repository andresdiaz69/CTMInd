# Table: Liquidaciones_JefesDeTallerDAI

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
| Productividad | decimal | NO |
| Comision_Productividad | decimal | NO |
| Satisfaccion | decimal | NO |
| Comision_Satisfaccion | decimal | NO |
| Comision_TOTAL | decimal | YES |
| IdComisionModeloSub | smallint | NO |
