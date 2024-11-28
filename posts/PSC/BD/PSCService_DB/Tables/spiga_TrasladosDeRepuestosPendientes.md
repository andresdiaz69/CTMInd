# Table: spiga_TrasladosDeRepuestosPendientes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas_Salida | smallint | YES |
| IdCentros_Salida | smallint | YES |
| AñoTraspaso_Salida | nvarchar | YES |
| SerieTraspaso_Salida | nvarchar | YES |
| NumTraspaso_Salida | int | YES |
| NumDetTraspaso_Salida | int | YES |
| IdSecciones_Salida | int | YES |
| IdEmpresas_Entrada | smallint | YES |
| IdCentros_Entrada | smallint | YES |
| AñoTraspaso_Entrada | nvarchar | YES |
| SerieTraspaso_Entrada | nvarchar | YES |
| NumTraspaso_Entrada | int | YES |
| NumDetTraspaso_Entrada | int | YES |
| IdSecciones_Entrada | int | YES |
| IdMovimientoTipos | nvarchar | YES |
| MR | nvarchar | YES |
| Referencia | nvarchar | YES |
| ValorBruto | decimal | YES |
| Unidades | decimal | YES |
| ValorNeto | decimal | YES |
| ValorMedioMovimiento | decimal | YES |
