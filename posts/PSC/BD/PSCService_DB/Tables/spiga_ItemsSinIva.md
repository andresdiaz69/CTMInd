# Table: spiga_ItemsSinIva

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| PkFkEmpresas | smallint | YES |
| Pkfkañofactura | nvarchar | YES |
| FkCentros | smallint | YES |
| PkFkSeries | nvarchar | YES |
| PkFkNumFactura | nvarchar | YES |
| FechaAlbaran | datetime | YES |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| Unidades | decimal | YES |
| PrecioUnidad | decimal | YES |
| PorcDto | decimal | YES |
| Subtotal | decimal | YES |
