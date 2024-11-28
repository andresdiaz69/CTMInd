# Table: ConsignacionesDetalles

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdConsignacion | int | NO |
| CodigoTerceroSpiga | bigint | YES |
| CedulaNitCliente | bigint | YES |
| NombreCliente | nvarchar | NO |
| Factura_a_Aplicar | nvarchar | NO |
| Detalle | nvarchar | NO |
| CodigoMarca | smallint | NO |
| PkFkEmpresas | smallint | NO |
| PkCtaBancarias_Iden | smallint | NO |
| FechaConsignacion | datetime | NO |
| Monto | decimal | NO |
| Tipo | nvarchar | NO |
| SucursalBancaria | nvarchar | YES |
| Comentario | nvarchar | YES |
| Soporte | nvarchar | NO |
| UserId | nvarchar | NO |
| FechaCreacion | datetime | NO |
| IdConsignacionEstado | int | NO |
| ModificoEstado_UserId | nvarchar | YES |
| ModificoEstado_Detalle | nvarchar | YES |
| ModificoEstado_Fecha | datetime | YES |
| Observacion_Rechazo | nvarchar | YES |
| Marca | nvarchar | YES |
