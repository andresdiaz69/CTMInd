# Table: BancoSucursales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkBancoEntidades | nvarchar | NO |
| PkBancoSucursales | nvarchar | NO |
| Nombre | nvarchar | NO |
| Direccion | nvarchar | YES |
| Poblacion | nvarchar | YES |
| Provincia | nvarchar | YES |
| FkPaises | nvarchar | YES |
| Telefono | nvarchar | YES |
| Fax | nvarchar | YES |
| DC | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| SWIFT | nvarchar | YES |
