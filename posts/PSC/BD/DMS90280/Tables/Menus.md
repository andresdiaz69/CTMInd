# Table: Menus

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkMenus | int | NO |
| FkMenus_Padre | int | YES |
| Nombre | nvarchar | NO |
| Accion | nvarchar | YES |
| Imagen | nvarchar | YES |
| Nivel | smallint | NO |
| Orden | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
