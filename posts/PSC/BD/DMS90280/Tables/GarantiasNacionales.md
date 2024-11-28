# Table: GarantiasNacionales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkGarantiasNacionales_Iden | int | NO |
| PkFkMarcas | smallint | NO |
| Familia | nvarchar | YES |
| Grupo | nvarchar | YES |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| DescripcionReferencia | nvarchar | YES |
| PorcTiempo | decimal | YES |
| FkManoObraCodigos | nvarchar | YES |
| FkMarcaTallerModelos | nvarchar | YES |
| AplicacionMateriales | nvarchar | YES |
| ReclamarMAT | nvarchar | YES |
| ReclamarMO | nvarchar | YES |
| Incompatibilidades | nvarchar | YES |
| CodProveedor | nvarchar | YES |
| NombreProveedor | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
