# Table: AbonosPiezasIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkAbonosPiezasIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| TipoRegistro | nvarchar | YES |
| NumCuentaConcesion | nvarchar | YES |
| NumFactura | nvarchar | YES |
| FechaReclamacion | datetime | YES |
| CargoAbono | nvarchar | YES |
| NaturalezaGasto | nvarchar | YES |
| ReferenciaDefectuosa | nvarchar | YES |
| CodProveedorDefectuosa | nvarchar | YES |
| FInicioGarantiaDefectuosa | datetime | YES |
| NumFacturaDefectuosa | nvarchar | YES |
| ReferenciaNueva | nvarchar | YES |
| CantidadRefNueva | decimal | YES |
| CORTRefNueva | nvarchar | YES |
| CodPedido | nvarchar | YES |
| PrecioUnitarioNueva | decimal | YES |
| PorcDescuento | decimal | YES |
| ImporteSinIVA | decimal | YES |
| PorcGestion | decimal | YES |
| Moneda | nvarchar | YES |
| DescripcionReclamacionAbono | nvarchar | YES |
| CuentaPrimaria | nvarchar | YES |
| CuentaAgente | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
