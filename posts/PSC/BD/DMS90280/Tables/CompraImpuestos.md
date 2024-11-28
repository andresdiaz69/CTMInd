# Table: CompraImpuestos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkComprasNumDet | smallint | NO |
| PkFkTerceros | int | NO |
| FkImpuestos | nvarchar | NO |
| Porc | decimal | YES |
| Importe | decimal | YES |
| PkFkImpuestoTipos | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PkCompraImpuestos_Iden | tinyint | NO |
| BaseImponible | decimal | YES |
| FkConceptosOperacion | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
