# Table: SerieTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkSerieTipos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| MarcaObligatoria | bit | NO |
| SerieInterna | bit | NO |
| FkMovimientoTipos | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkModulos | nvarchar | NO |
| TipoDocumento | nvarchar | YES |
| Precarga | bit | NO |
| ImpresoraFiscal | bit | NO |
| FechaMod | datetime | NO |
| LimiteMax | int | YES |
| FkTipoRetenciones | smallint | YES |
| PermiteAutoFactura | bit | NO |
