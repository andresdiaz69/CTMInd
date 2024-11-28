# Table: GIELibros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkGIELibros_Iden | int | NO |
| Nombre | nvarchar | NO |
| Descripcion | nvarchar | YES |
| FkEmpresas | smallint | YES |
| FkMarcas | smallint | YES |
| FkModulos | nvarchar | YES |
| FkRecursos | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| AccionExportacion | nvarchar | YES |
