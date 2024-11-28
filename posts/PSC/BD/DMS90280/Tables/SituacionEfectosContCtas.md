# Table: SituacionEfectosContCtas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkSituacionEfectos | tinyint | NO |
| PkSituacionEfectosContCtas_Iden | smallint | NO |
| FkContCtas | nvarchar | YES |
| DebeHaber | nvarchar | NO |
| FkEfectosImportes | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PkFkSituacionEfectos_Anterior | tinyint | NO |
| ObtenerCtaRemesa | bit | YES |
| ObtenerCtaSaldado | bit | YES |
