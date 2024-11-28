# Table: Presupuestos_VehiculosPrecios_Historico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | int | NO |
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
| Usuario | bigint | YES |
| FechaModificacion | datetime | YES |
| IdCategoriaMaquinaria | smallint | YES |
| Porcentaje_Consignacion | decimal | YES |
| UsadosConsignacion | bit | NO |
| idClase | smallint | NO |
