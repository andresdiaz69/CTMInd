# Table: TallerTrabajoPicajes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkEmpleados | smallint | NO |
| PkFkFechaTallerPicajesInicio | datetime | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkFkNumTrabajo | tinyint | NO |
| Tiempo | decimal | YES |
| FechaInicioAux | datetime | YES |
| FechaFinAux | datetime | YES |
| TiempoAux | decimal | YES |
| FkTallerEstadoTrabajos | nvarchar | NO |
| FkManoObraTipos | smallint | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| PicajeAutomatico | bit | NO |
| FechaMod | datetime | NO |
| FkFases | nvarchar | YES |
| UserAux | smallint | YES |
| CosteHora | decimal | YES |
