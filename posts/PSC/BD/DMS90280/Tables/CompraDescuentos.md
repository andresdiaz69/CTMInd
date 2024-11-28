# Table: CompraDescuentos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkComprasNumDet | smallint | NO |
| PkCompraDescuentosNumDet_Iden | smallint | NO |
| FkMarcas | smallint | NO |
| FkCompraMarcaDescuentos | nvarchar | NO |
| DtoPorc | decimal | YES |
| DtoImporte | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PorImporte | bit | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
