# Table: _LaFloresta_Mig_ReferenciasEmpresasCentros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMR | nvarchar | NO |
| PkFkReferencias | nvarchar | NO |
| PrecioMedio | numeric | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| StockMin | numeric | YES |
| StockMax | numeric | YES |
| FechaAlta | datetime | NO |
| AltaAutomatica | bit | NO |
| SiglaPSR_Recsa | tinyint | YES |
| SiglaPSR_Concesion | bit | NO |
| ContadorSiglaPSR | tinyint | YES |
| PSRStockMaximo | numeric | YES |
| PSRStockMinimo | numeric | YES |
| CoeficienteMultiploVentaMedia | numeric | YES |
| FechaMod | datetime | NO |
| CategoriaReaprovisionamientoSRD | nvarchar | YES |
| CodigoReaprovisionamiento | nvarchar | YES |
| CodigoDistribucionSRD | nvarchar | YES |
| CodigoDISPO_SRD | nvarchar | YES |
| CodigoDemandaSRD | nvarchar | YES |
| FkImpuestos_IVACompras | nvarchar | YES |
| PrecioMedioPorEmpresa | numeric | YES |
| FactorCambioPMContravalor | numeric | YES |
