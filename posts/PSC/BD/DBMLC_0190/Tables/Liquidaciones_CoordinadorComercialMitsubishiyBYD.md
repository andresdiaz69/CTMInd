# Table: Liquidaciones_CoordinadorComercialMitsubishiyBYD

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| CodigoEmpleado | bigint | YES |
| Empleado | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| NombreEmpresa | nvarchar | YES |
| FechaIngreso | datetime | YES |
| FechaRetiro | datetime | YES |
| CodigoCentro | smallint | YES |
| NombreCentro | nvarchar | YES |
| EntregasEfectivas | int | YES |
| Desde_Entregas | decimal | YES |
| Hasta_Entregas | decimal | YES |
| Comision_Entregas | decimal | YES |
| CodigoConcepto | int | YES |
| Comision_TOTAL | decimal | YES |
| FechaLiquidacion | datetime | YES |
