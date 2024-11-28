# Table: Promotec_Cotizacion_Respuestas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdCotizacion | bigint | NO |
| IdRespuesta | bigint | NO |
| ValorPrima | decimal | NO |
| IdAseguradora | int | NO |
| Aseguradora | nvarchar | NO |
| IdProducto | int | NO |
| Producto | nvarchar | NO |
| Estado | int | NO |
| Mensaje | nvarchar | NO |
| IdCotizacionAseg | nvarchar | NO |
| IdCotizacionPT | nvarchar | NO |
| IdCotizacionR | nvarchar | NO |
| Elegida | bit | NO |
| FechaElegida | datetime | YES |
| UsuarioEligio | nvarchar | YES |
| JsonEnviado | nvarchar | YES |
| JsonRecibido | nvarchar | YES |
