# Table: FacturacionDetLineaImpuestosProforma

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoFacturaProforma | nvarchar | NO |
| PkFkSeries_Proforma | nvarchar | NO |
| PkFkNumFacturaProforma | nvarchar | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries_OT | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkFkNumTrabajo | tinyint | NO |
| PkFkFacturacionDetLineaProforma | int | NO |
| PkFkImpuestoTipos | nvarchar | NO |
| PkFkImpuestos | nvarchar | NO |
| FkCentros | smallint | NO |
| PorcImpuesto | decimal | YES |
| ImporteImpuesto | decimal | YES |
| Descripcion | nvarchar | NO |
| BaseImponible | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
