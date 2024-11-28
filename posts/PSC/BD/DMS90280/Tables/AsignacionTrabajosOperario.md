# Table: AsignacionTrabajosOperario

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkAsignacionTrabajosOperario | datetime | NO |
| PkFkSecciones | int | NO |
| FkEmpleados | smallint | YES |
| PkAsignacionTrabajosOperarioNumDet_Iden | smallint | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkAñoOT | nvarchar | YES |
| FkSeries | nvarchar | YES |
| FkNumOT | int | YES |
| FkNumTrabajo | tinyint | YES |
| Orden | tinyint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkFases | nvarchar | YES |
| FkManoObraTipos | smallint | YES |
| FkCitas | int | YES |
| FkCitasDet | smallint | YES |
| FechaInicio | datetime | YES |
| FechaFin | datetime | YES |
| HorasAsignadas | decimal | YES |
| FechaBaja | datetime | YES |
| HorasImputadas | decimal | YES |
| HorasPrevistas | decimal | YES |
| FkEquipoPicaje | nvarchar | YES |
