# Table: CompraDescuentoDetalles

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkComprasNumDet | smallint | NO |
| PkFkCompraDescuentosNumDet | smallint | NO |
| PkFkCompraConcepto | nvarchar | NO |
| FkMarcas | smallint | NO |
| FkCompraMarcaDescuentos | nvarchar | NO |
| DtoPorc | decimal | YES |
| DtoImporte | decimal | YES |
| BaseCalculo | decimal | YES |
| ImporteConcepto | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
