# Table: Presupuestos_MaquinariaPrecios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| Id | int | NO |
| CodigoLinea | smallint | NO |
| Linea | varchar | NO |
| CodigoGama | smallint | NO |
| Gama | varchar | NO |
| CodigoModelo | int | NO |
| Modelo | varchar | NO |
| PrecioListaAntesDeImpuestos | decimal | NO |
| IdCategoría | smallint | NO |
| NombreCategoria | varchar | NO |
| Combustible | varchar | NO |
| AplicaPresupuesto | bit | NO |
| AnoPresupuesto | smallint | NO |
| Usuario | int | YES |
| FechaModificacion | datetime | YES |