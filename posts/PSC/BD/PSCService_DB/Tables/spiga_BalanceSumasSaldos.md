# Table: spiga_BalanceSumasSaldos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| PkContCtas | nvarchar | YES |
| FkCentros | smallint | YES |
| Centro | nvarchar | YES |
| DebeApertura | decimal | YES |
| HaberApertura | decimal | YES |
| DebePeriodo | decimal | YES |
| HaberPeriodo | decimal | YES |
| TotalDebe | decimal | YES |
| TotalHaber | decimal | YES |
