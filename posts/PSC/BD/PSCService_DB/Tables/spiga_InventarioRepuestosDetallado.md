# Table: spiga_InventarioRepuestosDetallado

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | NO |
| IdCentros | smallint | YES |
| IdSecciones | int | YES |
| IdUbicaciones | nvarchar | YES |
| IdMR | nvarchar | YES |
| IdReferencias | nvarchar | YES |
| Stock | decimal | YES |
| PrecioMedio | decimal | YES |
| PrecioCompra | decimal | YES |
| PrecioVenta | decimal | YES |
| ValorMedioReservado | decimal | YES |
| PrecioMedioDepreciado | decimal | YES |
| DescripcionReferencia | nvarchar | YES |
| IdReferenciasNueva | nvarchar | YES |
| NombreCentro | nvarchar | YES |
| DescripcionSeccion | nvarchar | YES |
| IdClasificacion1 | nvarchar | YES |
| DescripcionClasificacion1 | nvarchar | YES |
| AbreviaturaUnidadesMedida | nvarchar | YES |
| DescripcionUnidadesMedida | nvarchar | YES |
| UnidadesPtesConfirmar | decimal | YES |
| FactorCambioPMContravalor | decimal | YES |
| FechaUltimaCompra | datetime | YES |
| FechaUltimaVenta | datetime | YES |
| FechaUltimaRegularizacion | datetime | YES |
| FechaTraspasoTRE | datetime | YES |
| FechaTraspasoTRS | datetime | YES |
| FechaTMP | datetime | YES |
| IdClasificacion2 | nvarchar | YES |
| DescripcionClasificacion2 | nvarchar | YES |
