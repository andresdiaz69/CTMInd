# Table: Proveedores_Factura

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdProveedoresFactura | int | NO |
| Ano | int | YES |
| Mes | int | YES |
| CodEmpresa | smallint | YES |
| FechaFactura | date | YES |
| FechaVencimiento | date | YES |
| FechaSubida | date | YES |
| CodProveedor | bigint | YES |
| CodConcepto | bigint | YES |
| NumeroFactura | varchar | YES |
| Valor | numeric | YES |
| NumeroOrdenCompra | text | YES |
| NumeroAsientoContable | text | YES |
| ActivoFijo | bit | YES |
| FechaEntradaSpiga | date | YES |
| Diferido | bit | YES |
| NumeroMeses | int | YES |
| NumeroGisSolicitudAmortizacion | numeric | YES |
| Observaciones | text | YES |
| Factura | varchar | YES |
| FechaPago | date | YES |
| ValorAntesImpuestos | numeric | YES |
| ValorPagar | numeric | YES |
| Validada | bit | YES |
| Activo | bit | YES |
