# Table: spiga_MovimientoInventarios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | NO |
| IdMovimientoTipos | nvarchar | YES |
| IdCentros | smallint | YES |
| Centro | nvarchar | YES |
| IdSecciones | int | YES |
| Seccion | nvarchar | YES |
| ValorBruto | decimal | YES |
| Unidades | decimal | YES |
| ValorNeto | decimal | YES |
| ValorMedioMovimiento | decimal | YES |
