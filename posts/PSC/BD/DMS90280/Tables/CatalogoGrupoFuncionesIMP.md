# Table: CatalogoGrupoFuncionesIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCatalogoGrupoFuncionesIMP | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| TipoRegistro | nvarchar | NO |
| CodGrupoFunciones | nvarchar | YES |
| Descripcion | nvarchar | YES |
| NivelGrupoFunciones | nvarchar | YES |
| RelacionGrupoFunciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
