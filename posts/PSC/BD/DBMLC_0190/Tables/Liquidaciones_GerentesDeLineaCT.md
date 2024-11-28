# Table: Liquidaciones_GerentesDeLineaCT

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | int | NO |
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
| CodigoMArca | smallint | YES |
| Marca | nvarchar | YES |
| PesoComercial | decimal | NO |
| Comision_PesoComercial | decimal | NO |
| EficienciaAdministrativa | decimal | NO |
| Comision_EficienciaAdministrativa | decimal | NO |
| Comision_TOTAL | decimal | YES |
