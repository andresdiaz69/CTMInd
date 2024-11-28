# Table: CompraOpcionalesIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkComprasIMP | bigint | NO |
| PkFkOpcionales | nvarchar | NO |
| FkOpcionalTipos | nvarchar | YES |
| PrecioCompra | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkImpuestos | nvarchar | YES |
| FkImpuestoTipos | nvarchar | YES |
| PorcImpuesto | decimal | YES |
| ImporteImpuesto | decimal | YES |
| FkProcesos | int | YES |
| Descripcion | nvarchar | YES |
| PkCompraOpcionalesIMP | bigint | NO |
