# Table: RangoMarcaTallerModelosIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkRangoMarcaTallerModelosIMP | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| Producto | nvarchar | YES |
| FkMarcaTallerModelos | nvarchar | YES |
| VinDesde | nvarchar | YES |
| VinHasta | nvarchar | YES |
| FkMarcaTallerModelosReserva | nvarchar | YES |
| Descripcion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
