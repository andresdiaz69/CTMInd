# Table: Liquidaciones_JefesDeTallerFabricaDeColisionCT

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
| CantidadVehiculos | decimal | NO |
| Comision_CantidadVehiculos | decimal | NO |
| EntregasOportunas | decimal | NO |
| Comision_EntregasOportunas | decimal | NO |
| Comision_TOTAL | decimal | YES |
| IdComisionModeloSub | smallint | NO |
