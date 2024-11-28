# Table: Liquidaciones_CompradoresVehiculosUsados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | int | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | smallint | NO |
| Mes_Periodo | smallint | NO |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| NombreEmpresa | nvarchar | YES |
| FechaIngreso | datetime | YES |
| FechaRetiro | datetime | YES |
| IdComisionModeloSub | smallint | NO |
| Valor_Comision | decimal | NO |
| Unidades | int | NO |
| Comision_Compradores | decimal | NO |
| BonificacionVM | decimal | NO |
| Comision_TOTAL | decimal | YES |
