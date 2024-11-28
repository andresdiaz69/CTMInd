# Table: Liquidaciones_JefeDeVentasDaimlerVCCalle80

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| CodigoEmpleado | bigint | YES |
| Empleado | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| NombreEmpresa | nvarchar | YES |
| FechaIngreso | datetime | YES |
| FechaRetiro | datetime | YES |
| IdComisionModeloSub | smallint | YES |
| PesoComercial | decimal | YES |
| Comision_PesoComercial | decimal | YES |
| ParticipacionOtrosIngresos | decimal | YES |
| Comision_Bonificacion | decimal | YES |
| Comision_TOTAL | decimal | YES |
