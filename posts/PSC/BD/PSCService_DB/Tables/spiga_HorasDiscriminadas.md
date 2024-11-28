# Table: spiga_HorasDiscriminadas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| IdCentros | smallint | YES |
| Centro | nvarchar | YES |
| Seccion | nvarchar | YES |
| OT | nvarchar | YES |
| Trabajo | tinyint | YES |
| Placa | nvarchar | YES |
| Marca | nvarchar | YES |
| Gama | nvarchar | YES |
| AsesorServicioResponsable | nvarchar | YES |
| FechaAlta | datetime | YES |
| FechaEntrada | datetime | YES |
| FechaPrevistaEntregaPrimera | datetime | YES |
| FechaPrevistaEntrega | datetime | YES |
| TipoMO | nvarchar | YES |
| HorasEmpleadasMO | decimal | YES |
| HorasAsignadasMO | decimal | YES |
| HorasDisponibles | decimal | YES |
