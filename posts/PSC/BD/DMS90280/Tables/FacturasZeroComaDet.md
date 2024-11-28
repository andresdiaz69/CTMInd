# Table: FacturasZeroComaDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkFacturasZeroComa | int | NO |
| PkFacturasZeroComaDet_Iden | smallint | NO |
| ImporteBase | decimal | YES |
| BaseImponible | bit | YES |
| BaseExenta | bit | YES |
| BaseNoSujeta | bit | YES |
| PorcImpuesto | decimal | YES |
| FkImpuestoTipos | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkContCtas | nvarchar | YES |
| FkSecciones | int | YES |
| FkEntidades | nvarchar | YES |
| ReferenciaAlbaran | nvarchar | YES |
| ImportesDetAlbaran | decimal | YES |
| NumPedidoAlbaran | nvarchar | YES |
| OtrosDatos | nvarchar | YES |
| NumAlbaran | nvarchar | YES |
| NumPedidoProveedor | nvarchar | YES |
| Suplido | bit | YES |
