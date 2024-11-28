# Table: MarcaTallerModelosFIATIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkMarcaTallerModelosFIATIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegraciones | smallint | YES |
| FkFicheros | smallint | YES |
| FkProcesos | int | YES |
| FkMarcas | smallint | YES |
| CodMarca | nvarchar | YES |
| MVSCode | nvarchar | YES |
| GrupoMecanico | nvarchar | YES |
| GrupoCarroceria | nvarchar | YES |
| ModeloTaller | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ModeloTallerChapa | nvarchar | YES |
