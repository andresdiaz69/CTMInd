# Table: TercerosGrupo

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTerceros | int | NO |
| FkContCtas_Compras | nvarchar | NO |
| FkContCtas_Ventas | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaBaja | datetime | YES |
| FechaMod | datetime | NO |
| FkVentaCanales | nvarchar | YES |
