# Table: Liquidaciones_JefesDeVentas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| NombreEmpresa | nvarchar | YES |
| FechaIngreso | datetime | YES |
| FechaRetiro | datetime | YES |
| IdComisionModeloSub | smallint | YES |
| CodigoCentro | smallint | YES |
| Centro | nvarchar | YES |
| PesoComercial | decimal | YES |
| Comision_PesoComercial | decimal | YES |
| ColocacionCreditos | decimal | YES |
| Comision_ColocacionCreditos | decimal | YES |
| EficienciaAdministrativa | decimal | YES |
| Comision_EficienciaAdministrativa | decimal | YES |
| PesoComercialAuxiliar | decimal | YES |
| Comision_PesoComercialAuxiliar | decimal | YES |
| ColocacionCreditosYSeguros | decimal | YES |
| Comision_ColocacionCreditosYSeguros | decimal | YES |
| Comision_TOTAL | decimal | YES |
