# Table: CompraImpuestoDependientes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkComprasNumDet | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkImpuestoTipos | nvarchar | NO |
| PkFkCompraImpuestos | tinyint | NO |
| PkFkImpuestoTipos_Dependiente | nvarchar | NO |
| PkFkImpuestos | nvarchar | NO |
| Porc | decimal | YES |
| Importe | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
