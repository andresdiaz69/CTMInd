# Table: InformesCentros_Historico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| CentroID | int | NO |
| Activo | bit | NO |
| Empresa | smallint | NO |
| CodigoCentro | smallint | NO |
| CodigoSeccion | smallint | YES |
| Departamento | nvarchar | YES |
| CodigoMarca | smallint | YES |
| Tipo | nvarchar | NO |
| EmpresaPresupuesto | smallint | NO |
| DepartamentoPresupuesto | nvarchar | NO |
| UserIdCreo | nvarchar | NO |
| FechaCreacion | datetime | NO |
| Descripcion | varchar | YES |
