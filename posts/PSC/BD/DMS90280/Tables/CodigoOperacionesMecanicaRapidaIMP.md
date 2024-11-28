# Table: CodigoOperacionesMecanicaRapidaIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PKCodigoOperacionesMecanicaRapidaIMP | bigint | NO |
| Codigo | nvarchar | NO |
| SubCodigo | nvarchar | NO |
| GrupoOperacion | nvarchar | NO |
| DescripcionOperacion | nvarchar | NO |
| DescripcionSubcodigo | nvarchar | YES |
| FechaDesde | datetime | NO |
| FechaHasta | datetime | NO |
| CodMO | nvarchar | NO |
| DescripcionMO | nvarchar | YES |
| PrecioMO | decimal | NO |
| DescuentosPeso | nvarchar | NO |
| PorcDescuentosPromocion | decimal | NO |
| PorcDescuentosMO | decimal | NO |
| PorcDescuentosPiezas | decimal | NO |
| PrecioFortFait | decimal | NO |
| NumeroCuenta | nvarchar | NO |
| TipoMO | nvarchar | NO |
| CodigoControlVisual | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| FechaMod | datetime | NO |
