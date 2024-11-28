# Table: Liquidaciones_JefeDeVentasCali

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
| Comision_Ventas | decimal | YES |
| CodigoConcepto_1 | int | YES |
| Valor_Creditos | decimal | YES |
| Valor_Seguros | decimal | YES |
| Valor_VentasNetas | decimal | YES |
| ColocacionCreditosYSeguros | decimal | YES |
| Desde_Colocacion | decimal | YES |
| Hasta_Colocacion | decimal | YES |
| Comision_Colocacion | decimal | YES |
| CodigoConcepto_2 | int | YES |
| EficienciaAdministrativa | decimal | YES |
| Desde_Eficiencia | decimal | YES |
| Hasta_Eficiencia | decimal | YES |
| Comision_EficienciaAdministrativa | decimal | YES |
| CodigoConcepto_3 | int | YES |
| Comision_TOTAL | decimal | YES |
| FechaLiquidacion | datetime | YES |
