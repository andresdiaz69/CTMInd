# Table: ReferenciasStockIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkReferenciasStockIMP | bigint | NO |
| FkProcesos | int | NO |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| SiglaPSR_Recsa | tinyint | YES |
| SiglaPSR_Concesion | bit | YES |
| ContadorSiglaPSR | tinyint | YES |
| PSRStockMaximo | decimal | YES |
| PSRStockMinimo | decimal | YES |
| CoeficienteMultiploVentaMedia | decimal | YES |
| CodConcesionario | nvarchar | YES |
| FkReferencias_SustPor | nvarchar | YES |
| OtrosDatos1 | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| OtrosDatos2 | nvarchar | YES |
| OtrosDatos3 | nvarchar | YES |
| Fecha | datetime | YES |
| FechaMod | datetime | NO |
| CodigoReaprovisionamiento | nvarchar | YES |
| CategoriaReaprovisionamientoSRD | nvarchar | YES |
| CodigoDistribucionSRD | nvarchar | YES |
