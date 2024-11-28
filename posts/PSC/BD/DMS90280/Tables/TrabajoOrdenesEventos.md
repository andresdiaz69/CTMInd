# Table: TrabajoOrdenesEventos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkFkAplicacionEventos | smallint | NO |
| PkTrabajoOrdenesEventos_Fecha | datetime | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Mensaje | nvarchar | YES |
| FkMensajeEstados | tinyint | YES |
