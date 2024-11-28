# Table: Liquidaciones_AsesorComercialVehiculosUsadosPorFinV2

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| CodigoEmpresa | smallint | YES |
| Empresa | nvarchar | YES |
| CedulaVendedor | bigint | YES |
| CodigoEmpleado | bigint | YES |
| NombreVendedor | nvarchar | YES |
| Empleado | nvarchar | YES |
| FechaRetiro | datetime | YES |
| CodigoMarca | smallint | YES |
| Marca | nvarchar | YES |
| VehiculosRecaudados | int | YES |
| ComisionFinancieras | decimal | YES |
| IdRangoMaestra | smallint | YES |
| IdComisionModeloSub | int | YES |
