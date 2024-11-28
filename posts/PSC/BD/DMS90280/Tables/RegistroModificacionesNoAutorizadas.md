# Table: RegistroModificacionesNoAutorizadas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkRegistroModificacionesNoAutorizadas | int | NO |
| FechaRegistro | datetime | NO |
| HostRegistro | nvarchar | NO |
| UserRegistro | nvarchar | NO |
| NombreEsquema | nvarchar | NO |
| NombreTabla | nvarchar | NO |
| Operacion | nvarchar | NO |
| Datos | nvarchar | NO |
| FechaRevision | datetime | YES |
| HostRevision | nvarchar | YES |
| UserRevision | nvarchar | YES |
