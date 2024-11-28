# Table: ReferenciasTarifasCanje

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMR | nvarchar | NO |
| PkFkTarifas | tinyint | NO |
| PkFkReferencias | nvarchar | NO |
| PkReferenciasTarifasCanje_Iden | smallint | NO |
| ConfiguracionTipos | tinyint | NO |
| FkTerceros | int | YES |
| Sobretasa | decimal | YES |
| Penalizacion | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
