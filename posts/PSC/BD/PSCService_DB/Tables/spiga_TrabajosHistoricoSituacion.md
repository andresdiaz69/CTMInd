# Table: spiga_TrabajosHistoricoSituacion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| CodEmpresa | smallint | YES |
| CodCentro | smallint | YES |
| Centro | nvarchar | YES |
| CodSeccion | int | YES |
| Seccion | nvarchar | YES |
| Placa | nvarchar | YES |
| Marca | nvarchar | YES |
| Gama | nvarchar | YES |
| OT | nvarchar | YES |
| NumTrabajo | tinyint | YES |
| DescipcionTrabajo | nvarchar | YES |
| FechaAltaOT | datetime | YES |
| FechaAltaTrabajo | datetime | YES |
| FechaPrevistaEntregaPrimera | datetime | YES |
| FechaPrevistaEntrega | datetime | YES |
| FechaEntrega | datetime | YES |
| SituacionTrabajo | nvarchar | YES |
| ObservacionesSituacionTrabajo | nvarchar | YES |
| FechaAltaSituacionTrabajo | datetime | YES |
| EquipoAltaSituacionTrabajo | nvarchar | YES |
| EmpleadoAltaSituacionTrabajo | nvarchar | YES |
| CodCliente | int | YES |
| ClienteCargo | nvarchar | YES |
| AsesorServicioResponsable | nvarchar | YES |
| Nombre | nvarchar | YES |
