# Table: ExogenasHorasEmpleados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdExogena | int | NO |
| Ano | smallint | NO |
| Mes | smallint | NO |
| CodigoEmpleado | bigint | NO |
| IdTipo | smallint | NO |
| Horas | decimal | NO |
| Observaciones | nvarchar | NO |
| Aprobada | bit | NO |
| UserIdCreo | nvarchar | NO |
| FechaCreacion | datetime | NO |
| UserIdAprobo | nvarchar | YES |
| FechaAprobacion | datetime | YES |
