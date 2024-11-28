# Table: ComprasActaEntrega

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkComprasNumDet | smallint | NO |
| PkAñoActaEntrega | nvarchar | NO |
| PkFkSeries_ActaEntrega | nvarchar | NO |
| PkActaEntrega | int | NO |
| FechaAlta | datetime | NO |
| FechaAnulacion | datetime | YES |
| FkUsuarios_Anulacion | smallint | YES |
| FkEmpleados_Anulacion | smallint | YES |
| HostAnulacion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
