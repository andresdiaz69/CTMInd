# Table: FacturasZeroComaPedidosServiciosDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkFacturasZeroComa | int | NO |
| PkFkFacturasZeroComaPedidosServicios | smallint | NO |
| PkFacturasZeroComaPedidosServiciosDet_iden | smallint | NO |
| TiposBase | nvarchar | YES |
| ImporteBase | decimal | YES |
| FkImpuestoTipos | nvarchar | YES |
| PorcImpuesto | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
