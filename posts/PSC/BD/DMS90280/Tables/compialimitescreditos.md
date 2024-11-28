# Table: compialimitescreditos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkLimitesCreditoTipos | int | NO |
| LimiteCredito | decimal | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| LimiteCreditoTemporal | decimal | YES |
| FechaHastaTemporal | datetime | YES |
