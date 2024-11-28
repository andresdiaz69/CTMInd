# Table: Viaticos_Aprobacion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdAprobacion | int | NO |
| IdSolicitud | int | NO |
| CodigoEmpleado | bigint | NO |
| CodigoAutorizador | bigint | NO |
| RealizaViaje | int | YES |
| AutorizaViaticos | int | YES |
| ValorTotalSolicitud | numeric | YES |
| FechaCreacion | datetime | NO |
| ObservacionesAprobacion | varchar | YES |
| ReciboCaja | int | YES |
| FechaAprobacion | datetime | YES |
| FechaRecibo | datetime | YES |
| DevolucionNomina | int | YES |
| FechaRegistro | datetime | YES |
| CorteNomina | datetime | YES |
| IdUsuarioModifica | int | YES |
| FechaModificaUsuario | datetime | YES |
