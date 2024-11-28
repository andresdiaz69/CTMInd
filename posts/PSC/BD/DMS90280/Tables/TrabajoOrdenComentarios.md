# Table: TrabajoOrdenComentarios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkTrabajoOrdenComentarios | datetime | NO |
| Comentario | nvarchar | NO |
| FkEmpleados | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTrabajoOrdenComentarioTipos | smallint | YES |
| FkArchivos | int | YES |
