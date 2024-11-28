# Table: ManoObraCodigosImportadoraHyundaiE2IMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkManoObraCodigosImportadoraHyundaiE2IMP | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| FkManoObraCodigosImportadora | nvarchar | YES |
| FkMarcaTallerModelos | nvarchar | YES |
| AñoModelo | nvarchar | YES |
| FechaIntroduccion | datetime | YES |
| FechaDesde | datetime | YES |
| FechaHasta | nvarchar | YES |
| UT | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaDesdeJuliana | int | YES |
| FechaHastaJuliana | int | YES |
