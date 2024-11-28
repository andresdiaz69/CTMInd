# Table: Liquidaciones_BonificacionTalleres

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | int | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | smallint | NO |
| Mes_Periodo | smallint | NO |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | YES |
| Fecha_Ingreso | datetime2 | YES |
| CodigoEmpresa | smallint | YES |
| Empresa | nvarchar | YES |
| Unidad_Negocio | nvarchar | YES |
| Nombre_Unidad_Negocio | nvarchar | YES |
| codigo_centro | varchar | YES |
| NombreCentro | char | YES |
| Codigo_Cargo | char | YES |
| NombreCargo | varchar | YES |
| Comision | decimal | NO |
| CodigoConceptoBonificacionTaller | int | NO |
