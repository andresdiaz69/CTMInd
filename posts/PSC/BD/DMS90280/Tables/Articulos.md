# Table: Articulos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkArticulos_Iden | int | NO |
| Descripcion | nvarchar | NO |
| FkArticulosTipos | int | NO |
| CodigoInterno | nvarchar | YES |
| FkFabricantes | int | YES |
| CodigoFabricante | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
