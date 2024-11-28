# Table: ModeloEspecificacionesIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkModeloEspecificacionesIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkFicheros | smallint | YES |
| FkProcesos | int | YES |
| FkMarcas | smallint | YES |
| CodigoGama | nvarchar | YES |
| CodModelo | nvarchar | YES |
| AñoModelo | nvarchar | YES |
| ExtModelo | nvarchar | YES |
| CodEspecificacion | nvarchar | NO |
| Descripcion | nvarchar | NO |
| Valor | nvarchar | NO |
| UnidadMedida | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| DatosRelacionados | nvarchar | YES |
| DatosExclusion | nvarchar | YES |
