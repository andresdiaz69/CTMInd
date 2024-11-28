# Table: Versiones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkFkGamas | smallint | NO |
| PkFkCodModelo | nvarchar | NO |
| PkFkExtModelo | nvarchar | NO |
| PkFkAñoModelo | nvarchar | NO |
| PkVersiones | nvarchar | NO |
| Descripcion | nvarchar | NO |
| VersionActiva | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkPartidasArancelarias | nvarchar | YES |
