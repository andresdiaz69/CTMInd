# Table: spiga_FormasDePagoDeFacturas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| IdCentros | smallint | YES |
| IdTerceros | int | YES |
| IdTercerosPagador | int | YES |
| Modulo | nvarchar | YES |
| NumeroFactura | nvarchar | YES |
| FechaFactura | datetime | YES |
| NombreTercero | nvarchar | YES |
| Situacion | nvarchar | YES |
| Importe | decimal | YES |
| FormaPago | nvarchar | YES |
| NumDocumentoCancelacion | nvarchar | YES |
| FechaCancelacion | datetime | YES |
