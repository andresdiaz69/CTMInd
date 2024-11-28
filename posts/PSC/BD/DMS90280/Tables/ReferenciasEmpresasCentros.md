# Table: ReferenciasEmpresasCentros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMR | nvarchar | NO |
| PkFkReferencias | nvarchar | NO |
| PrecioMedio | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| StockMin | decimal | YES |
| StockMax | decimal | YES |
| FechaAlta | datetime | NO |
| AltaAutomatica | bit | NO |
| SiglaPSR_Recsa | tinyint | YES |
| SiglaPSR_Concesion | bit | NO |
| ContadorSiglaPSR | tinyint | YES |
| PSRStockMaximo | decimal | YES |
| PSRStockMinimo | decimal | YES |
| CoeficienteMultiploVentaMedia | decimal | YES |
| FechaMod | datetime | NO |
| CategoriaReaprovisionamientoSRD | nvarchar | YES |
| CodigoReaprovisionamiento | nvarchar | YES |
| CodigoDistribucionSRD | nvarchar | YES |
| CodigoDISPO_SRD | nvarchar | YES |
| CodigoDemandaSRD | nvarchar | YES |
| FkImpuestos_IVACompras | nvarchar | YES |
| PrecioMedioPorEmpresa | decimal | YES |
| FactorCambioPMContravalor | decimal | YES |
