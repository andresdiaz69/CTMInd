# Table: CampañasMarketing

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkImportadoras | int | NO |
| PkFkMarcas | smallint | NO |
| PkCampañasMarketing | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FechaActivacionDesde | datetime | YES |
| FechaActivacionHasta | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaBaja | datetime | YES |
| FechaMod | datetime | NO |
| EsDeTarifa | bit | NO |
| ImprimirEnFactura | bit | NO |
| FkCampañasMarketingTipos | tinyint | NO |
| PlazoMeses | smallint | YES |
| ImporteMinimo | decimal | YES |
| Descuento | decimal | YES |
