# Table: Liquidaciones_ComercialVNJefesBonoPorObjetivos_Detalle

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdDetalle | bigint | NO |
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | smallint | NO |
| Mes_Periodo | smallint | NO |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | NO |
| CodigoEmpresa | smallint | NO |
| Empresa | nvarchar | YES |
| FechaRetiro | datetime | YES |
| CodigoCentro | int | YES |
| Centro | nvarchar | YES |
| VehiculosRecaudados | int | YES |
| NumeroFactura | nvarchar | YES |
| VIN | nvarchar | YES |
| CodigoModelo | nvarchar | YES |
| Modelo | nvarchar | YES |
| CedulaVendedor | bigint | YES |
| NombreVendedor | nvarchar | YES |
