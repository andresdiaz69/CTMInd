# Table: AbonosFacturaIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkAbonosFacturaIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| TipoRegistro | nvarchar | YES |
| NumFactura | nvarchar | YES |
| TipoPago | nvarchar | YES |
| CategoriaFactura | nvarchar | YES |
| CuentaPagador | nvarchar | YES |
| VIN | nvarchar | YES |
| Moneda | nvarchar | YES |
| TotalSinIva | decimal | YES |
| TotalMOSinIva | decimal | YES |
| TotalPiezasSinIva | decimal | YES |
| TotalLUSinIva | decimal | YES |
| TotalForfaitSinIva | decimal | YES |
| IvaPorc | decimal | YES |
| IvaRecuperable | nvarchar | YES |
| TotalConIva | decimal | YES |
| TotalIva | decimal | YES |
| TotalDto | decimal | YES |
| CuentaPrimaria | nvarchar | YES |
| CuentaAgente | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| IdentificadorMarca | nvarchar | YES |
