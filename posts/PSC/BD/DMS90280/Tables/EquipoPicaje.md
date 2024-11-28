# Table: EquipoPicaje

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkEquipoPicaje | nvarchar | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkSecciones | int | NO |
| FkManoObraTipos | smallint | NO |
| FkCentros | smallint | NO |
| FechaBaja | datetime | YES |
