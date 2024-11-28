# Table: ErrorRevisionTrabajos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkErrorRevisionTrabajos | bigint | NO |
| ModeloTaller | nvarchar | YES |
| VIN | nvarchar | YES |
| Operacion | nvarchar | YES |
| Kmts | int | YES |
| Taller | nvarchar | YES |
| NumOrden | nvarchar | YES |
| FechaRevision | datetime | YES |
| AvisoRecibido | bit | YES |
| Matricula | nvarchar | YES |
| CodigoError | nvarchar | YES |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkSeries | nvarchar | YES |
| FkNumOT | int | YES |
| FkAñoOT | nvarchar | YES |
| FkNumTrabajo | tinyint | YES |
| FkManoObraGrupos | nvarchar | YES |
| FkTrabajoManoObras | smallint | YES |
| FechaCorreccion | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
