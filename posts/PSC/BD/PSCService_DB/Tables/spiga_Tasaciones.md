# Table: spiga_Tasaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| IdCentros | smallint | YES |
| IdTasacion | int | YES |
| IdTerceros | int | YES |
| NombreCentro | nvarchar | YES |
| FechaTasacion | datetime | YES |
| NombreTasador | nvarchar | YES |
| Apellido1Tasador | nvarchar | YES |
| Apellido2Tasador | nvarchar | YES |
| NombreVendedor | nvarchar | YES |
| Apellido1Vendedor | nvarchar | YES |
| Apellido2Vendedor | nvarchar | YES |
| NombreTercero | nvarchar | YES |
| Apellido1Tercero | nvarchar | YES |
| Apellido2Tercero | nvarchar | YES |
| Matricula | nvarchar | YES |
| VIN | nvarchar | YES |
| Marca | nvarchar | YES |
| Gama | nvarchar | YES |
| NombreModelo | nvarchar | YES |
| DescripcionVersion | nvarchar | YES |
| Kms | int | YES |
| HorasUso | int | YES |
| ImporteSolicitado | decimal | YES |
| ImporteBaremado | decimal | YES |
| ImporteFinal | decimal | YES |
| FechaEntrada | datetime | YES |
| AñoExpediente | nvarchar | YES |
| SerieExpediente | nvarchar | YES |
| NumExpediente | int | YES |
| PrecioCompra | decimal | YES |
| FechaInicioGarantia | datetime | YES |
| FechaProximaInspeccion | datetime | YES |
| Cilindrada | decimal | YES |
