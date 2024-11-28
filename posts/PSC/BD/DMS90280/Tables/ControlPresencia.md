# Table: ControlPresencia

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpleados | smallint | NO |
| PkControlPresencia_Iden | int | NO |
| FechaPresencia | datetime | NO |
| FechaSalida | datetime | YES |
| FkOrigenesFichaje | smallint | YES |
| FkMotivosCambioFichaje | smallint | YES |
| FkEmpleados_Cambio | smallint | YES |
| Modificado | bit | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
