# Table: spiga_RecepcionesActivas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| IdCentros | smallint | YES |
| Serie | nvarchar | YES |
| Num | int | YES |
| Año | nvarchar | YES |
| AñoOT | nvarchar | YES |
| SerieOT | nvarchar | YES |
| NumOT | int | YES |
| Matricula | nvarchar | YES |
| VIN | nvarchar | YES |
| NombreMarca | nvarchar | YES |
| NombreGama | nvarchar | YES |
| NombreModelo | nvarchar | YES |
| FechaEntrada | datetime | YES |
| FechaPrevistaEntrega | datetime | YES |
| NombreEmpleado | nvarchar | YES |
| Apellido1Empleado | nvarchar | YES |
| Apellido2Empleado | nvarchar | YES |
| VentasRecepcionActiva | decimal | YES |
| Procesado | bit | YES |
