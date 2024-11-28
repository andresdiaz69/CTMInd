# Table: MaquinasImportacion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMaquinas | int | NO |
| PkMaquinasImportacion | nvarchar | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkSecciones | int | YES |
| Descripcion | nvarchar | YES |
| CompCodigo | nvarchar | YES |
| CompDescripcion | nvarchar | YES |
| CompCantidad | decimal | YES |
| CompCoste | decimal | YES |
| CompPrecio | decimal | YES |
| CodigoSpiga | nvarchar | YES |
| FkAñoOT | nvarchar | YES |
| FkSeries | nvarchar | YES |
| FkNumOT | int | YES |
| FkNumTrabajo | tinyint | YES |
| FkTrabajoPinturas | smallint | YES |
| FkAñoSalidasAlbaran | nvarchar | YES |
| FkSeries_Salidas | nvarchar | YES |
| FkNumSalidasAlbaran | nvarchar | YES |
| FkSalidasDet | int | YES |
| FechaAlta | datetime | NO |
| FechaProcesado | datetime | YES |
| FechaDescartado | datetime | YES |
| NombreArchivo | nvarchar | YES |
| ErrorImportacion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
