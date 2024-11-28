# Table: LavadosTrabajoExterno

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkLavaderos | smallint | NO |
| PkFkLavados | int | NO |
| PkFkEmpresas | smallint | NO |
| FkWFClasificaciones | nvarchar | NO |
| FkArticulos | int | YES |
| Descripcion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| SerieAlbaran | nvarchar | YES |
| Preciocompra | decimal | YES |
| DtoPorcCompra | decimal | YES |
