# Table: GIEFormulas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkGIEFormulas_Iden | int | NO |
| Nombre | nvarchar | NO |
| Descripcion | nvarchar | NO |
| Esquema | nvarchar | NO |
| Procedimiento | nvarchar | NO |
| FkModulos | nvarchar | NO |
| FkGIECategorias | smallint | YES |
| FkGIESubcategorias | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| CampoBDResultado | nvarchar | YES |
| Coleccion | bit | NO |
| FechaMod | datetime | NO |
