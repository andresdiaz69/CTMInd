# Table: VariosCodigos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkVariosCodigos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| Precio | decimal | NO |
| PorcDescuento | decimal | NO |
| FechaBaja | datetime | YES |
| FkEmpleados_Baja | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkVariosCodigosInternos | nvarchar | NO |
| Precarga | bit | NO |
| FechaMod | datetime | NO |
| DescripcionDetallada | nvarchar | YES |
| Agrupado | bit | NO |
| FkModulos_CodigosProducto | nvarchar | YES |
| FkCodigosProducto | nvarchar | YES |
