# Table: ContsMantenimientoDescripcionIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkContsMantenimientoDescripcionIMP_Iden | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | NO |
| FkFicheros | smallint | YES |
| FkMarcas | smallint | YES |
| TipoContrato | nvarchar | YES |
| IdUnicoTipoContrato | nvarchar | YES |
| Descripcion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
