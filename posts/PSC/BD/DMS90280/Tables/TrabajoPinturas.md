# Table: TrabajoPinturas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkFkNumTrabajo | tinyint | NO |
| PkTrabajoPinturas_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| PorcDescuento | decimal | NO |
| Precio | decimal | NO |
| PrecioCoste | decimal | YES |
| FkManoObraTipos | smallint | NO |
| FkPinturaCodigos | nvarchar | YES |
| Unidades | decimal | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaAlta | datetime | NO |
| FechaMod | datetime | NO |
| OperacionPrincipal | bit | YES |
| PorcDefC | decimal | YES |
| PorcDefI | decimal | YES |
| FkGarantiaTipos | nvarchar | YES |
| CodAveria | nvarchar | YES |
| IdentificacionLineaOrigenCargo | nvarchar | YES |
| FkMarcas_Kit | smallint | YES |
| TallerKits | nvarchar | YES |
