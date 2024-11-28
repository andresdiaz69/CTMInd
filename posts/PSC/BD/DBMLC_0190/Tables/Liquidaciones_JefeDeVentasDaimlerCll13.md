# Table: Liquidaciones_JefeDeVentasDaimlerCll13

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
| PesoComercial_Mitsubishi | decimal | NO |
| Comision_PesoComercial_Mitsubishi | decimal | NO |
| PesoComercial_Fuso | decimal | NO |
| Comision_PesoComercial_Fuso | decimal | NO |
| ColocacionCreditos | decimal | NO |
| Comision_ColocacionCreditos | decimal | NO |
| EficienciaAdministrativa | decimal | NO |
| Comision_EficienciaAdministrativa | decimal | NO |
| Comision_TOTAL | decimal | YES |
