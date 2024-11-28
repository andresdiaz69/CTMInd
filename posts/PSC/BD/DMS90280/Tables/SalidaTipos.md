# Table: SalidaTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkSalidaTipos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMarcas | smallint | YES |
| Precarga | bit | NO |
| FechaBaja | datetime | YES |
