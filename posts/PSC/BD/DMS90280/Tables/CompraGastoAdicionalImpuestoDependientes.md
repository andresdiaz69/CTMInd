# Table: CompraGastoAdicionalImpuestoDependientes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCompraGastoAdicionales | int | NO |
| PkFkImpuestoTipos | nvarchar | NO |
| PkFkImpuestoTipos_Dependiente | nvarchar | NO |
| PkFkImpuestos | nvarchar | NO |
| Porc | decimal | YES |
| Importe | decimal | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
