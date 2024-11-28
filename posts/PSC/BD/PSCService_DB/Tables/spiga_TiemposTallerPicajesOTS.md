# Table: spiga_TiemposTallerPicajesOTS

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| IdCentros | smallint | YES |
| IdEmpleados | smallint | YES |
| FechaInicio | datetime | YES |
| FechaFin | datetime | YES |
| IdPicajeTrabajoTipos | varchar | YES |
| Matricula | varchar | YES |
| SerieOT | varchar | YES |
| NumOT | int | YES |
| AñoOT | varchar | YES |
| NumTrabajo | smallint | YES |
| TiempoEmpleado | decimal | YES |
| FechaInicioAux | datetime | YES |
| FechaFinAux | datetime | YES |
| TiempoAux | decimal | YES |
| NombreEmpleado | varchar | YES |
| DescripcionPicajeTrabajoTipos | varchar | YES |
| IdManoObraTipos | smallint | YES |
| DescripcionManoObraTipos | varchar | YES |
| Recuperable | bit | YES |
| AfectaTaller | bit | YES |
| IdClasificacionIncidenciaTipos | smallint | YES |
| IdRevisionPicajeTipos | varchar | YES |
| UserAux | smallint | YES |
| IdSecciones | int | YES |
| FechaBaja | datetime | YES |
