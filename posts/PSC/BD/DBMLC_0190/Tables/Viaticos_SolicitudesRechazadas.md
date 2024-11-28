# Table: Viaticos_SolicitudesRechazadas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSolicitudViaje | int | NO |
| CodigoAprobador | bigint | NO |
| IdTipo | int | YES |
| Rechazada | bit | YES |
| Comentarios | nvarchar | YES |
| ApruebaOtros | int | YES |
| FechaRechazo | datetime | YES |
| IdSolicitudRechazada | int | NO |
| IdUsuario | int | YES |
| FechaCreacionUsuario | datetime | YES |
| IdUsuarioModifica | int | YES |
| FechaModificaUsuario | datetime | YES |
