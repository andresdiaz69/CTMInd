# Table: spiga_OrdenesDeTrabajoCitasSinOT

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | NO |
| IdCentros | smallint | YES |
| IdCitas | int | YES |
| Matricula | nvarchar | YES |
| IdVehiculos | int | YES |
| FechaCita | datetime | YES |
| FechaAltaCita | datetime | YES |
| IdCitaTipos | smallint | YES |
| DescripcionCitasDet | nvarchar | YES |
| HorasAsignadas | decimal | YES |
| IdCitasDet | smallint | YES |
| IdMarcas | smallint | YES |
| NombreMarca | nvarchar | YES |
| IdGamas | smallint | YES |
| NombreGama | nvarchar | YES |
| CodModelo | nvarchar | YES |
| ExtModelo | nvarchar | YES |
| AñoModelo | nvarchar | YES |
| NombreModelo | nvarchar | YES |
| IdTerceros | int | YES |
| NombreTercero | nvarchar | YES |
| IdRecepcionTipos | nvarchar | YES |
| VIN | nvarchar | YES |
| DescripcionRecepcionTipos | nvarchar | YES |
| NombreEmpleadoAltaOT | nvarchar | YES |
| NombreEmpleado | nvarchar | YES |
| Movil | nvarchar | YES |
| Observaciones | nvarchar | YES |
| IdMotivoCita | smallint | YES |
| CitaDesasistida | bit | YES |
| PersonaContacto | nvarchar | YES |
| TelefonoPersonaContacto | nvarchar | YES |
| FechaInicioReparacion | datetime | YES |
| NifCifEmpleadoAltaOT | nvarchar | YES |
| NifCifEmpleado | nvarchar | YES |
| FechaBaja | datetime | YES |
| FechaMatriculacion | datetime | YES |
| UT | int | YES |
| Campañas | nvarchar | YES |
| IdOrigenCita | smallint | YES |
| OrigenCitas | nvarchar | YES |