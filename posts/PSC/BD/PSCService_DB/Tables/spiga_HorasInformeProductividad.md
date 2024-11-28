# Table: spiga_HorasInformeProductividad

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpleados | bigint | YES |
| NombreEmpleado | varchar | YES |
| HorasFacturadas | decimal | YES |
| ImporteMOFacturada | decimal | YES |
| HorasEmpleadas | decimal | YES |
| HorasEmpleadasCierre | decimal | YES |
| HorasImproductivas | decimal | YES |
| IdEmpresas | smallint | YES |
| IdCentros | smallint | YES |
| Empresa | varchar | YES |
| Centro | varchar | YES |
