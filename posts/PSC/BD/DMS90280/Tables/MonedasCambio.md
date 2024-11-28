# Table: MonedasCambio

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMonedas | smallint | NO |
| PkFkMonedas_Cambio | smallint | NO |
| PkFechaDesde | datetime | NO |
| FechaHasta | datetime | YES |
| FactorCambio | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FactorCambioCompra | decimal | YES |
