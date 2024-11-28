# Table: spiga_SegurosContact

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| PkFkVehiculos | int | YES |
| DescripcionSeguroTipos | nvarchar | YES |
| IdTerceros | int | YES |
| Compañia | nvarchar | YES |
| FechaAlta | datetime | YES |
| FechaVencimiento | datetime | YES |
| Importe | decimal | YES |
| ImporteFranquicia | decimal | YES |
| NumeroPoliza | nvarchar | YES |
