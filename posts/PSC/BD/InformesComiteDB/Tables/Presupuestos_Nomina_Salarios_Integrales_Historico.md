# Table: Presupuestos_Nomina_Salarios_Integrales_Historico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| Id_Nomina_SalariosIntegrales | bigint | NO |
| CodigoLinea | smallint | NO |
| CodigoCentro | int | NO |
| IdClase | smallint | YES |
| CodigoEmpleado | bigint | NO |
| Codigo_Cargo | int | NO |
| Salario | decimal | NO |
| PorcentajeDistribucion | decimal | YES |
| IdUsuario | varchar | NO |
| CedulaUsuario | bigint | NO |
| PorcentajeDistribucion_Anterior | decimal | YES |
| FechaModificacionUsuario | datetime | YES |
