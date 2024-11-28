# Table: GruposModelos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkGruposModelos | nvarchar | NO |
| PkFkModulos | nvarchar | NO |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkCodModelo | nvarchar | YES |
| FkExtModelo | nvarchar | YES |
| FkAñoModelo | nvarchar | YES |
| FkVersiones | nvarchar | YES |
| FkOpcionales | nvarchar | YES |
| FkOpcionalTipos | nvarchar | YES |
| Descripcion | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| PermiteRappels | bit | NO |
| PermiteComisiones | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| PkFkEmpresas | smallint | NO |
| FechaMod | datetime | NO |
