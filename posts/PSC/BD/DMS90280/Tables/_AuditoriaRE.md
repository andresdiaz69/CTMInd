# Table: _AuditoriaRE

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| CuentaPorPagar | nvarchar | YES |
| ValorAPagar | decimal | YES |
| TerceroAsiento | int | YES |
| FechaFactura | datetime | YES |
| Gestion_Contab | nvarchar | YES |
| FechaAsientoCompra | datetime | YES |
| NumAsientoCompra | int | YES |
| ImporteEfectos | decimal | YES |
| TerceroGestion | int | YES |
| TerceroPagador | int | YES |
| IdAsientoPago | int | YES |
| AñoAsientoPago | nvarchar | YES |
| FechaAsientoPago | datetime | YES |
| NumAsientoPago | int | YES |
| SituacionEfecto | nvarchar | YES |
| CuentaPago | nvarchar | YES |
| BancoPago | smallint | YES |
| ICA | decimal | YES |
| ReteIVA | decimal | YES |
| ReteFuente | decimal | YES |
