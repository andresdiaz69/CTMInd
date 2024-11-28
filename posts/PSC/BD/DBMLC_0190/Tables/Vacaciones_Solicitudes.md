# Table: Vacaciones_Solicitudes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| Id | bigint | NO |
| CodigoEmpleado | bigint | NO |
| FechaSolicitud | datetime | YES |
| FechaInicio | datetime | YES |
| FechaFinal | datetime | YES |
| DiasHabiles | int | YES |
| DiasEnDinero | int | YES |
| IdEstado | int | YES |
| IdTipo | int | YES |
| Activacion | bit | YES |
| FechaRespuesta | datetime | YES |
| Observaciones | nvarchar | YES |
| Documento | nvarchar | YES |
| Excepciones | bit | NO |
| Periodo | smallint | YES |
