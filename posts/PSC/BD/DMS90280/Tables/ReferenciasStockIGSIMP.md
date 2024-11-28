# Table: ReferenciasStockIGSIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkReferenciasStockIGSIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| FkSecciones | int | YES |
| FkUbicaciones | nvarchar | YES |
| FechaAlta | datetime | YES |
| Stock | decimal | YES |
| PrecioMedio | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| NumLineaFichero | int | YES |
| FechaUltimaCompra | datetime | YES |
| FechaUltimaVenta | datetime | YES |
