# Table: ObsoletosDepreciacionTramos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkObsoletosDepreciacionTramos_Iden | smallint | NO |
| MesesDesdeVenta | tinyint | NO |
| MesesHastaVenta | tinyint | NO |
| MesesDesdeCompra | tinyint | YES |
| MesesHastaCompra | tinyint | YES |
| Porcentaje | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| NumOrden | tinyint | NO |
| FechaBaja | datetime | YES |
| FechaMod | datetime | NO |
| FkMR | nvarchar | YES |
