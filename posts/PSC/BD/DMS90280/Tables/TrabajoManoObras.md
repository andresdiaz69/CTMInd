# Table: TrabajoManoObras

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkFkNumTrabajo | tinyint | NO |
| PkFkManoObraGrupos | nvarchar | NO |
| PkTrabajoManoObras_Iden | smallint | NO |
| FkManoObraCodigos | nvarchar | YES |
| Descripcion | nvarchar | NO |
| FkManoObraTipos | smallint | NO |
| FkVariante | nvarchar | YES |
| UT | int | NO |
| PorcDescuento | decimal | NO |
| PrecioHora | decimal | NO |
| PrecioCoste | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaAlta | datetime | NO |
| FkTarifaTaller | nvarchar | YES |
| FechaMod | datetime | NO |
| OperacionPrincipal | bit | NO |
| FechaBaja | datetime | YES |
| PorcDefC | decimal | YES |
| PorcDefI | decimal | YES |
| FkGarantiaTipos | nvarchar | YES |
| CodAveria | nvarchar | YES |
| CodExterno | nvarchar | YES |
| PosExterno | nvarchar | YES |
| FkMarcas | smallint | YES |
| FkTallerKits | nvarchar | YES |
| IdentificacionLineaOrigenCargo | nvarchar | YES |
