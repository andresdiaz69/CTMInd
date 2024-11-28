# Table: GrupoDefectosIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkContsMantenimientoDefectos_Iden | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| TipoVehiculo | nchar | YES |
| CodGrupoDefecto | nvarchar | NO |
| PatronCodigoDefecto | nvarchar | NO |
| FechaInicio | datetime | YES |
| FechaFin | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
