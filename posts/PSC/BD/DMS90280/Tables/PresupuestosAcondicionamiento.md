# Table: PresupuestosAcondicionamiento

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkNumExpediente | int | NO |
| PkPresupuestosAcondicionamiento_Iden | smallint | NO |
| FechaAlta | datetime | NO |
| FkEmpleados | smallint | YES |
| FkEmpleados_Autorizador | smallint | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| ActualizarPreciosVenta | bit | NO |
| FechaBaja | datetime | YES |
| FechaMod | datetime | NO |
