# Table: Balances

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkBalances_Iden | tinyint | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Precarga | bit | NO |
| FechaBaja | datetime | YES |
| FechaMod | datetime | NO |
| FkBalanceTipos | smallint | YES |
