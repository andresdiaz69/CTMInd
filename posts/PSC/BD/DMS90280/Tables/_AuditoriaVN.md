# Table: _AuditoriaVN

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| VIN | nvarchar | YES |
| PkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkNumExpediente | int | NO |
| PkComprasNumDet_Iden | smallint | NO |
| FechaAsiento_Compra | varchar | YES |
| NumeroAsiento_Compra | int | NO |
| FkTerceros | int | NO |
| FkMarcas | smallint | NO |
| Nombre | nvarchar | NO |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FechaFactura | varchar | YES |
| BaseImponible | decimal | YES |
| ImporteCompra | decimal | NO |
| FkAsientos_Compra | int | YES |
| FkAñoAsiento_Compra | nvarchar | YES |
| FKAsientos_Pago | int | YES |
| FkAñoAsiento_Pago | nvarchar | YES |
| FechaAsiento_Pago | datetime | YES |
| NumAsiento_Pago | int | YES |
| ValorAsientoCompra | decimal | YES |
| ValorICA | decimal | YES |
| ValorRETEIVA | decimal | YES |
| ValorReteFuente | decimal | YES |
| Tercero_Pagador | int | YES |
| CuentaPago | nvarchar | YES |
| CuentaBancariaPago | smallint | YES |
| EstadoEfecto | nvarchar | YES |
| ValorEfecto | decimal | YES |
| CuentaCompra | nvarchar | YES |
