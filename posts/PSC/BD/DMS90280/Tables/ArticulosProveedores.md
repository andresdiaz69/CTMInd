# Table: ArticulosProveedores

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkArticulos | int | NO |
| PkFkTerceros | int | NO |
| CodigoInterno | nvarchar | YES |
| PrecioUnitario | decimal | YES |
| DtoPorc | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PkFkCentros | smallint | NO |
| PkUnidadesDesde | decimal | NO |
| UnidadesHasta | decimal | YES |
| PrecioExento | decimal | YES |
