# Table: Liquidaciones_GerenteDeLineaMinoristaMitsubishiDaimlerBYD

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
| EntregasEfectivas | int | YES |
| Desde_Ventas | decimal | YES |
| Hasta_Ventas | decimal | YES |
| Comision_Entregas | decimal | YES |
| CodigoConcepto_1 | int | YES |
| EficienciaAdministrativa | decimal | YES |
| Desde_Eficiencia | decimal | YES |
| Hasta_Eficiencia | decimal | YES |
| Comision_EficienciaAdministrativa | decimal | YES |
| CodigoConcepto_2 | int | YES |
| Comision_TOTAL | decimal | YES |
| FechaLiquidacion | datetime | YES |
