# Table: Liquidaciones_GerenteDivisionalCT

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
| PesoComercial_Renault | decimal | NO |
| Comision_PesoComercial_Renault | decimal | NO |
| PesoComercial_DaimlerPC | decimal | NO |
| Comision_PesoComercial_DaimlerPC | decimal | NO |
| PesoComercial_DaimlerFuso | decimal | NO |
| Comision_PesoComercial_DaimlerFuso | decimal | NO |
| EficienciaAdministrativa | decimal | NO |
| Comision_EficienciaAdministrativa | decimal | NO |
| Comision_TOTAL | decimal | YES |
