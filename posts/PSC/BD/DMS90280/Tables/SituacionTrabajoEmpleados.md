# Table: SituacionTrabajoEmpleados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkSituacionTrabajo | nvarchar | NO |
| PkSituacionTrabajoEmpleados_Iden | int | NO |
| FkCentros | smallint | NO |
| FkSecciones | int | NO |
| FkEmpleados_Responsable | smallint | NO |
| PorDefecto | bit | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
