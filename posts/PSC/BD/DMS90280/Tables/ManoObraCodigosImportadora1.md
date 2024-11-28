# Table: ManoObraCodigosImportadora1

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkFkMarcaTallerModelos | nvarchar | NO |
| PkManoObraCodigosImportadora1 | nvarchar | NO |
| PkVariante | nvarchar | NO |
| PkFechaDesde | int | NO |
| PkFechaHasta | int | NO |
| Descripcion | nvarchar | NO |
| UTFabrica | int | NO |
| UTCliente | int | YES |
| UTGarantia | int | YES |
| FechaBaja | datetime | YES |
| FkTarifaTaller | nvarchar | YES |
| SuperficiePintada | smallint | YES |
| FkManoObraTipos | smallint | YES |
| Actualizada | bit | NO |
| Manual | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
