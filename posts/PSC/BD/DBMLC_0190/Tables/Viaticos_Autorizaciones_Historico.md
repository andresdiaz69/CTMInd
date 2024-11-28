# Table: Viaticos_Autorizaciones_Historico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSolicitudHistorico | int | NO |
| IdSolicitudViaje | bigint | NO |
| CodigoAprobador | bigint | NO |
| IdTipo | int | YES |
| Aprobacion | bit | YES |
| Comentarios | nvarchar | YES |
| ApruebaOtros | int | YES |
| FechaAutorizacion | datetime | YES |
| IdAutorizacion | int | NO |
| IdUsuario | int | YES |
| FechaCreacionUsuario | datetime | YES |
| IdUsuarioModifica | int | YES |
| FechaModificaUsuario | datetime | YES |
