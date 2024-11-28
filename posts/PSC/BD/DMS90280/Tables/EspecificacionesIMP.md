# Table: EspecificacionesIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkEspecificacionesIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkFicheros | smallint | YES |
| FkProcesos | int | YES |
| FkEspecificacionesTipos | smallint | YES |
| CodEspecificacion | nvarchar | YES |
| Descripcion | nvarchar | YES |
| Valor | nvarchar | YES |
| UnidadMedida | nvarchar | YES |
| CodImpPadre | bigint | YES |
| CodigoPadre | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
