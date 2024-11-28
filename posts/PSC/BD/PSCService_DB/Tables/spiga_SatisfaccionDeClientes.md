# Table: spiga_SatisfaccionDeClientes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | int | YES |
| FkTerceros | int | YES |
| Tercero | nvarchar | YES |
| NifCif | nvarchar | YES |
| Direccion | nvarchar | YES |
| TelefonoPrincipal | nvarchar | YES |
| TelefonoTrabajo | nvarchar | YES |
| Celular | nvarchar | YES |
| Email | nvarchar | YES |
| Ciudad | nvarchar | YES |
| IdTercerosContacto | int | YES |
| TerceroContacto | nvarchar | YES |
| NifCifContacto | nvarchar | YES |
| DireccionContacto | nvarchar | YES |
| TelefonoPrincipalContacto | nvarchar | YES |
| TelefonoTrabajoContacto | nvarchar | YES |
| CelularContacto | nvarchar | YES |
| EmailContacto | nvarchar | YES |
| CiudadContacto | nvarchar | YES |
| Asesor | nvarchar | YES |
| OrdenServicio | nvarchar | YES |
| Matricula | nvarchar | YES |
| VIN | nvarchar | YES |
| Marca | nvarchar | YES |
| Gama | nvarchar | YES |
| DescripcionModelo | nvarchar | YES |
| Kmts | int | YES |
| FechaCompra | datetime | YES |
| Descripcion | nvarchar | YES |
| NombreCentro | nvarchar | YES |
| IdCentros | smallint | YES |
| PkAñoSalidasAlbaran | nvarchar | YES |
| PedidoTipoVentas | nvarchar | YES |
| FechaEntregaVenta | datetime | YES |
