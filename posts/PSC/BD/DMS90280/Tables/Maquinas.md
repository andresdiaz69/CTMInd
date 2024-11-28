# Table: Maquinas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkMaquinas_Iden | int | NO |
| Descripcion | nvarchar | NO |
| FkMaquinasTipos | nvarchar | NO |
| FkHosts | nvarchar | YES |
| FkAplicaciones | nvarchar | YES |
| RutaExportacion | nvarchar | YES |
| RutaImportacion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| CadenaConexionBDD | nvarchar | YES |
| FkMR | nvarchar | YES |
| UnidadesImportacion | nvarchar | YES |
