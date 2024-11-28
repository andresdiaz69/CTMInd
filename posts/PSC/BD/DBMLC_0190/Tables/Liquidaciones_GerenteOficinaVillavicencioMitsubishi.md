# Table: Liquidaciones_GerenteOficinaVillavicencioMitsubishi

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
| VehiculosRecaudados | int | YES |
| VentasNacionales | int | YES |
| PesoComercial | decimal | YES |
| Desde_PesoComercial | decimal | YES |
| Hasta_PesoComercial | decimal | YES |
| Comision_PesoComercial | decimal | YES |
| IdRangoMaestras_PesoComercial | smallint | YES |
| CodigoConcepto_PesoComercial | int | YES |
| EntregasEfectivas | int | YES |
| CreditosDesembolsados | decimal | YES |
| ColocacionCreditos | decimal | YES |
| Desde_ColocacionCreditos | decimal | YES |
| Hasta_ColocacionCreditos | decimal | YES |
| Comision_ColocacionCreditos | decimal | YES |
| IdRangoMaestra_ColocacionCreditos | smallint | YES |
| CodigoConcepto_ColocacionCreditos | int | YES |
| EficienciaAdministrativa | decimal | YES |
| Desde_EficienciaAdministrativa | decimal | YES |
| Hasta_EficienciaAdministrativa | decimal | YES |
| Comision_EficienciaAdministrativa | decimal | YES |
| IdRangoMaestra_EficienciaAdministrativa | smallint | YES |
| CodigoConcepto_EficienciaAdministrativa | int | YES |
| Comision_TOTAL | decimal | YES |
