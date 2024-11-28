# Table: Presupuestos_VehiculosPrecios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| Id | int | NO |
| AnoPresupuesto | int | NO |
| CodigoMarca | smallint | NO |
| Marca | varchar | NO |
| CodigoGama | smallint | NO |
| Gama | varchar | NO |
| CodigoModelo | int | NO |
| Modelo | varchar | NO |
| PrecioListaAntesDeImpuestos | decimal | NO |
| Clasificacion | varchar | NO |
| Combustible | varchar | NO |
| AplicaPresupuesto | bit | NO |
| Usuario | int | YES |
| FechaModificacion | datetime | YES |
| IdCategoriaMaquinaria | smallint | YES |
| idClase | smallint | YES |
| Porcentaje_Consignacion | decimal | YES |
| UsadosConsignacion | bit | NO |
