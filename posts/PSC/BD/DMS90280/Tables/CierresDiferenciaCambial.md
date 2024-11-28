# Table: CierresDiferenciaCambial

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkDiferenciaCambialTipoOperacion | tinyint | NO |
| PkFkMonedas | smallint | NO |
| PkCierresDiferenciaCambial_Año | nvarchar | NO |
| PkCierresDiferenciaCambial_Mes | tinyint | NO |
| FkAñoAsiento_Cierre | nvarchar | YES |
| FkAsientos_Cierre | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
