# Table: ControlPresenciaHistoricos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpleados | smallint | NO |
| PkFkControlPresencia | int | NO |
| PkControlPresenciaHistoricos_Iden | smallint | NO |
| FechaPresencia | datetime | NO |
| FechaSalida | datetime | YES |
| FkOrigenesFichaje | smallint | YES |
| FkMotivosCambioFichaje | smallint | YES |
| FkEmpleados_Cambio | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| FechaModificacion | datetime | NO |
