# Table: ContsMantenimientoIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkContsMantenimientoIMP_Iden | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| FkMarcas | smallint | YES |
| TipoContrato | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| IdUnicoTipoContrato | nvarchar | YES |
