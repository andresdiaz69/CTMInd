# Table: spiga_FacturasRecibidas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| pkfkempresas | smallint | YES |
| marca | nvarchar | YES |
| cantidad | int | YES |
| nombre | nvarchar | YES |
| FkAsientoGestionEliminacion | nvarchar | YES |
