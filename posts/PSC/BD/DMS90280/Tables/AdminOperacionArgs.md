# Table: AdminOperacionArgs

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkAdminOperaciones | smallint | NO |
| PkAdminOperacionArgs | tinyint | NO |
| FkAdminOperacionArgTipos | tinyint | NO |
| Nombre | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FkAdminOperacionArgs_Padre | tinyint | YES |
| EsObligatorio | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
