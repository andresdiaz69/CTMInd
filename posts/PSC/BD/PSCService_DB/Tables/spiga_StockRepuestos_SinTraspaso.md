# Table: spiga_StockRepuestos_SinTraspaso

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| IdCentros | smallint | YES |
| IdSecciones | int | YES |
| IdMR | nvarchar | YES |
| IdReferencias | nvarchar | YES |
| IdTarifas | tinyint | YES |
| StockMax | decimal | YES |
| PrecioMedio | decimal | YES |
| ClasificacionABC | nvarchar | YES |
| Stock | decimal | YES |
| NumUbicaciones | int | YES |
| VentasMesActualSalidas | int | YES |
| UndPteRecibir | decimal | YES |
| IdUbicaciones | nvarchar | YES |
| VentasMesActual | decimal | YES |
| VentasMes1 | decimal | YES |
| VentasMes2 | decimal | YES |
| VentasMes3 | decimal | YES |
| VentasMes4 | decimal | YES |
| VentasMes5 | decimal | YES |
| VentasMes6 | decimal | YES |
| VentasMes7 | decimal | YES |
| VentasMes8 | decimal | YES |
| VentasMes9 | decimal | YES |
| VentasMes10 | decimal | YES |
| VentasMes11 | decimal | YES |
| VentasMes12 | decimal | YES |
| Descripcion | nvarchar | YES |
| PrecioVenta | decimal | YES |
| Observaciones | nvarchar | YES |
| IdClasificacion1 | nvarchar | YES |
| IdClasificacion2 | nvarchar | YES |
| IdClasificacion3 | nvarchar | YES |
| IdClasificacion4 | nvarchar | YES |
| IdClasificacion5 | nvarchar | YES |
| IdClasificacion6 | nvarchar | YES |
| IdDescuentos | nvarchar | YES |
| FechaUltimaVenta | datetime | YES |
| FechaUltimaCompra | datetime | YES |
| FechaUltimaRegularizacion | datetime | YES |
| FechaTraspasoTRE | datetime | YES |
| FechaTraspasoTRS | datetime | YES |
| DenominacionClasificacion1 | nvarchar | YES |
| DenominacionClasificacion2 | nvarchar | YES |
| DenominacionClasificacion3 | nvarchar | YES |
| DenominacionClasificacion4 | nvarchar | YES |
| DenominacionClasificacion5 | nvarchar | YES |
| DenominacionClasificacion6 | nvarchar | YES |
| FechaAlta | datetime | YES |
| FechaBaja | datetime | YES |
| StockMin | decimal | YES |
| UndPteEntregar | decimal | YES |
| UndReservadasPteEntregar | decimal | YES |
| UndEnvaseCompra | decimal | YES |
| UndEnvaseVenta | decimal | YES |