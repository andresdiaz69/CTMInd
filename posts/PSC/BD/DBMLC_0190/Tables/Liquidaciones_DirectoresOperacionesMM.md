# Table: Liquidaciones_DirectoresOperacionesMM

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| CodigoEmpleado | bigint | YES |
| Empleado | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| FechaIngreso | datetime | YES |
| FechaRetiro | datetime | YES |
| ValorNetoMostrador_VentasPosventa | decimal | NO |
| ValorNetoTaller_VentasPosventa | decimal | NO |
| ValorNetoTotal_VentasPosventa | decimal | NO |
| ValorNetoTaller_MOColision | decimal | NO |
| IdComisionModeloSub | smallint | YES |
| CodigoMarcaGrupo | smallint | YES |
| MarcaGrupo | nvarchar | YES |
| Comision_VentasPosventa | decimal | NO |
| Comision_MOColision | decimal | NO |
| Comision_TOTAL | decimal | YES |
