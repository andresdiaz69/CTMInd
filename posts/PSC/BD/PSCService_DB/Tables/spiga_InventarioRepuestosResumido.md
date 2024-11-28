# Table: spiga_InventarioRepuestosResumido

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | NO |
| NombreEmpresa | nvarchar | YES |
| IdCentros | smallint | YES |
| NombreCentro | nvarchar | YES |
| IdSecciones | int | YES |
| DescripcionSeccion | nvarchar | YES |
| IdMR | nvarchar | YES |
| DescripcionMR | nvarchar | YES |
| IdClasificacion1 | nvarchar | YES |
| DescripcionClasificacion1 | nvarchar | YES |
| Fecha | datetime | YES |
| Stock | decimal | YES |
| ValorPM | decimal | YES |
| ValorCosto | decimal | YES |
| ValorTarifa | decimal | YES |
| NumLineas | int | YES |
| ValorMedioReservado | decimal | YES |
| ValorDepreciado | decimal | YES |
| IdTarifas | smallint | YES |
| ValorMedioTREPdte | decimal | YES |
