# Table: CampañaComprasIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCampañaComprasIMP | bigint | NO |
| FkProcesos | int | NO |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| Precio | decimal | YES |
| DtoPorc | decimal | YES |
| FkPedidoTipoCodigoMarca | nvarchar | YES |
| UnidadesDesde | decimal | YES |
| UnidadesHasta | decimal | YES |
| OtrosDatos1 | nvarchar | YES |
| OtrosDatos2 | nvarchar | YES |
| OtrosDatos3 | nvarchar | YES |
| OtrosDatos4 | nvarchar | YES |
| DescripcionCampaña | nvarchar | YES |
| FechaAltaCampaña | datetime | YES |
| FechaBajaCampaña | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| OtrosDatos5 | decimal | YES |
