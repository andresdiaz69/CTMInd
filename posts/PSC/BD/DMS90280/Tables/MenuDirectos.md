# Table: MenuDirectos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkUsuarios | smallint | NO |
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkMenuDirectos_Iden | int | NO |
| FkMenuDirectos_Padre | int | YES |
| Nombre | nvarchar | NO |
| FkMenus | int | YES |
| Imagen | nvarchar | YES |
| Nivel | smallint | NO |
| Orden | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
