# Table: CampañaCompras

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMR | nvarchar | NO |
| PkFkCampañas | nvarchar | NO |
| PkFkReferencias | nvarchar | NO |
| Precio | decimal | NO |
| DtoPorc | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | NO |
| PkCampañaCompras_Iden | int | NO |
| FkPedidoTipoCodigoMarca | nvarchar | YES |
| UnidadesDesde | decimal | YES |
| UnidadesHasta | decimal | YES |
