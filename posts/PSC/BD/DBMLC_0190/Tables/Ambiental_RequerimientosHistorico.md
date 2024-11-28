# Table: Ambiental_RequerimientosHistorico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdRequerimientosHistorico | int | NO |
| IdRequerimientos | int | YES |
| CodigoEmpleado | bigint | YES |
| CorreoSolicitante | varchar | YES |
| CentroSolicitante | varchar | YES |
| FechaRecepcion | date | YES |
| DiasAvisoVencimiento | int | YES |
| CodigoEmpresa | smallint | YES |
| CodigoMarcas | smallint | YES |
| CodigoCentro | smallint | YES |
| Proceso | text | YES |
| EntidadOrigen | text | YES |
| Asunto | text | YES |
| ScanearRequerimiento | varchar | YES |
| NumeroRequerimiento | varchar | YES |
| DescripcionRequisito | text | YES |
| PlanDeAccion | varchar | YES |
| FechaLimiteAccion | date | YES |
| FechaLimiteRespuesta | date | YES |
| FechaSeguimiento | date | YES |
| PlanAccionEjecutada | varchar | YES |
| Comentarios | text | YES |
| ScanearDocumentoRadicado | varchar | YES |
| IdEstadosRequerimientos | int | YES |
| IdListaSanciones | int | YES |
| MultaEconomica | decimal | YES |
| DiasCierre | varchar | YES |
| DocumentoRespuesta | varchar | YES |
