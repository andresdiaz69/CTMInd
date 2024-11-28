# Table: TrabajoVarios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFKEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkFkNumTrabajo | tinyint | NO |
| PkTrabajoVarios_Iden | smallint | NO |
| FkVariosCodigos | nvarchar | YES |
| Descripcion | nvarchar | NO |
| PorcDescuento | decimal | NO |
| Unidades | decimal | NO |
| FkManoObraTipos | smallint | YES |
| Precio | decimal | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkVariosCodigosInternos | nvarchar | YES |
| Automatico | bit | NO |
| FechaAlta | datetime | NO |
| FechaMod | datetime | NO |
| CodigoGarantia | nvarchar | YES |
| OperacionPrincipal | bit | YES |
| PorcDefC | decimal | YES |
| PorcDefI | decimal | YES |
| FkGarantiaTipos | nvarchar | YES |
| CodAveria | nvarchar | YES |
| IdentificacionLineaOrigenCargo | nvarchar | YES |
| FkMarcas_Kit | smallint | YES |
| TallerKits | nvarchar | YES |
| CodExterno | nvarchar | YES |
