# Table: TareaAsignadaDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkTareaAsignada | bigint | NO |
| PkTareaAsignadaDet_Iden | smallint | NO |
| FkEmpleados | smallint | NO |
| FechaInicio | datetime | YES |
| FechaFin | datetime | YES |
| Horas | decimal | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
