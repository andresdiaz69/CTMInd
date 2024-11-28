# Table: AsignacionTrabajosOperarioDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkAsignacionTrabajosOperario | datetime | NO |
| PkFkSecciones | int | NO |
| FkEmpleados | smallint | YES |
| PkFkAsignacionTrabajosOperarioNumDet | smallint | NO |
| PkAsignacionTrabajosOperarioDet_Iden | smallint | NO |
| FechaInicio | datetime | NO |
| FechaFin | datetime | NO |
| HorasAsignadas | decimal | NO |
| Operacion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Orden | tinyint | NO |
| HorasImputadas | decimal | YES |
| HorasPrevistas | decimal | YES |
| FkEquipoPicaje | nvarchar | YES |
