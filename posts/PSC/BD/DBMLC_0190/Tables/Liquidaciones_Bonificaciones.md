# Table: Liquidaciones_Bonificaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | int | NO |
| IdLiquidacion | int | NO |
| Ano_Periodo | smallint | NO |
| Mes_Periodo | smallint | NO |
| CodigoEmpleado | bigint | NO |
| Empleado | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| Empresa | nvarchar | YES |
| Unidad_Negocio | nvarchar | YES |
| Nombre_Unidad_Negocio | nvarchar | YES |
| codigo_centro | varchar | YES |
| NombreCentro | nvarchar | YES |
| Codigo_Cargo | char | YES |
| NombreCargo | nvarchar | YES |
| Comision | decimal | NO |
| ValorMaximoBonificacion | int | NO |
| CodigoConceptoBonificacionTaller | int | NO |
