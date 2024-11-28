# Table: RecibosHistorico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkRecibos | int | NO |
| PkRecibosHistorico_Iden | int | NO |
| FkTerceros | int | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| ImporteTotal | decimal | YES |
| ImportePdte | decimal | YES |
| ImportePdteVincular | decimal | YES |
| FkReciboEstados | nvarchar | NO |
| Concepto | nvarchar | NO |
| FkCentros | smallint | YES |
| FechaAlta | datetime | NO |
| FechaSaldado | datetime | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaVinculacion | datetime | YES |
