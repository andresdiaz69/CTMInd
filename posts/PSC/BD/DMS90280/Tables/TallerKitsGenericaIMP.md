# Table: TallerKitsGenericaIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkTallerKitsGenericaIMP | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| NumeroLinea | int | NO |
| TipoLinea | int | YES |
| Marca | nvarchar | YES |
| CodigoKit | nvarchar | NO |
| DescripcionKit | nvarchar | YES |
| CodOperacion | nvarchar | YES |
| DescripcionOperacion | nvarchar | YES |
| Unidades | decimal | YES |
| Precio | decimal | YES |
| PorcDescuento | decimal | YES |
| FechaDesde | datetime | YES |
| FechaHasta | datetime | YES |
| TipoKit | nvarchar | YES |
| MantenerHoras | nvarchar | YES |
| MantenerMOPrecio | nvarchar | YES |
| MantenerMATPrecio | nvarchar | YES |
| OpPrincipal | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| MR | nvarchar | YES |
| DetallarKitsImpresion | nvarchar | YES |
