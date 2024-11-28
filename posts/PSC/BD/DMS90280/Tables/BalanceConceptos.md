# Table: BalanceConceptos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkBalances | tinyint | NO |
| PkBalanceConceptos | smallint | NO |
| Descripcion | nvarchar | NO |
| Orden | smallint | NO |
| DebeHaber | nvarchar | NO |
| FkBalanceConceptos_Padre | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
