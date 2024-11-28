# Table: MarcaTallerModelosDescripcionFIATIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkMarcaTallerModelosDescripcionFIATIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegraciones | smallint | YES |
| FkFicheros | smallint | YES |
| FkProcesos | int | YES |
| FkMarcas | smallint | YES |
| CodMarca | nvarchar | YES |
| MVSCode | nvarchar | YES |
| Descripcion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
