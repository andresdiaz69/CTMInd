# Table: MecanicaRapidaOperaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkImportadoras | int | NO |
| PkFkMarcas | smallint | NO |
| PkFkMecanicaRapidaCodigosOperaciones | nvarchar | NO |
| PkFkMecanicaRapidaSubCodigosOperaciones | nvarchar | NO |
| PkMecanicaRapidaOperaciones | nvarchar | NO |
| FkMecanicaRapidaGruposOperaciones | nvarchar | NO |
| FechaDesde | datetime | NO |
| FechaHasta | datetime | NO |
| CodMO | nvarchar | NO |
| DescripcionMO | nvarchar | NO |
| PrecioMO | decimal | NO |
| DescuentosPeso | bit | NO |
| PorcDescuentosPromocion | decimal | NO |
| PorcDescuentosMO | decimal | NO |
| PorcDescuentosPiezas | decimal | NO |
| PrecioFortFait | decimal | NO |
| TipoMO | nvarchar | YES |
| FkManoObraTipos | smallint | YES |
| CodigoControlVisual | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
