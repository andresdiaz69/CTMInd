# Table: Liquidaciones_GerenteComercialVehiculosComerciales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | int | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| CodigoEmpleado | bigint | YES |
| Nombres | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| NombreEmpresa | nvarchar | YES |
| FechaIngreso | datetime | YES |
| FechaRetiro | datetime | YES |
| VehiculosRecaudados | int | YES |
| VehiculosNacionales | int | YES |
| PesoComercial | decimal | YES |
| Desde | decimal | YES |
| Hasta | decimal | YES |
| Comision_PesoComercial | decimal | YES |
| Comision_TOTAL | decimal | YES |
| CodigoConcepto | int | YES |
| FechaLiquidacion | datetime | YES |
