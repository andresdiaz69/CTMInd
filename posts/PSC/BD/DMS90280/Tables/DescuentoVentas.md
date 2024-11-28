# Table: DescuentoVentas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMR | nvarchar | NO |
| PkFkClienteCategorias | smallint | NO |
| PkFkPedidoTipoVentas | smallint | NO |
| PkFkDescuentos | nvarchar | NO |
| DtoPorc | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | NO |
| PkDescuentos_Iden | int | NO |
| FkClasificacion1 | nvarchar | YES |
| ImporteDesde | decimal | YES |
| ImporteHasta | decimal | YES |
