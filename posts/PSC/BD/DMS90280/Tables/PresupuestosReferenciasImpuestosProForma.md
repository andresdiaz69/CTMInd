# Table: PresupuestosReferenciasImpuestosProForma

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoFactura_Proforma | nvarchar | NO |
| PkFkSeries_FacturaProforma | nvarchar | NO |
| PkFkNumFactura_Proforma | nvarchar | NO |
| PkFkPresupuestosReferenciasProForma | smallint | NO |
| PkFkImpuestoTipos | nvarchar | NO |
| FkImpuestos | nvarchar | NO |
| ImpuestoPorc | decimal | YES |
| ImpuestoImporte | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
