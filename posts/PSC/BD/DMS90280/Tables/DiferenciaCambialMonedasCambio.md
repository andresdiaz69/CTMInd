# Table: DiferenciaCambialMonedasCambio

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkDiferenciaCambialTipoOperacion | tinyint | NO |
| PkFkMonedas | smallint | NO |
| PkDiferenciaCambialMonedasCambioAño | smallint | NO |
| PkDiferenciaCambialMonedasCambioMes | tinyint | NO |
| FactorCambioCompras | decimal | NO |
| FactorCambioVentas | decimal | NO |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| UserAlta | smallint | NO |
| FechaAlta | datetime | NO |
| HostAlta | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
