# Table: Gamas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkGamas | smallint | NO |
| Nombre | nvarchar | NO |
| NombreAbreviado | nvarchar | YES |
| CodigoMarca | nvarchar | YES |
| Activa | bit | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| DiasDeCarenciaDocumentacion | smallint | YES |
| ClaseVehiculo | nvarchar | YES |
| Segmento | nvarchar | YES |
| PorcDtoMaxVendedores | decimal | YES |
| Precarga | bit | NO |
| FkClasificacionTipos | nvarchar | YES |
| PrecioAnticipoGastos | decimal | YES |
| FkCodificacionModeloTipos | nvarchar | NO |
| FkTextoTipo_CondicionesGenerales | nvarchar | YES |
| FechaMod | datetime | NO |
| FkCategoriaGamaTipos | nvarchar | YES |
| OfertarRemolque | bit | NO |
| TextoCondicionesGarantia | nvarchar | YES |
| FechaPrevistaEntradaProduccion | datetime | YES |
| DiasEntregaFabrica | smallint | YES |
| FkAutomotorGamaTipos | nvarchar | YES |
| FkMaquinariaGamaTipos | nvarchar | YES |
| DescripcionOficial | nvarchar | YES |
| PorcDtoMaxJefesVentas | decimal | YES |
| TextoCondicionesGarantiaVNCabecera | nvarchar | YES |
| TextoCondicionesGarantiaVOCabecera | nvarchar | YES |
| TextoCondicionesGarantiaVOCuerpo | nvarchar | YES |
