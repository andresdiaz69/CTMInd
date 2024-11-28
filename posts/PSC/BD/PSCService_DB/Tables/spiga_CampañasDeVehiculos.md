# Table: spiga_CampañasDeVehiculos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| PkFkVehiculos | int | YES |
| IdCampañas | nvarchar | YES |
| Marca | nvarchar | YES |
| IdCampañaVariante | nvarchar | YES |
| Descripcion | nvarchar | YES |
| FechaInicio | datetime | YES |
| FechaFin | datetime | YES |
| FechaMatriculacion | datetime | YES |
