# Table: Rappels

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMarcas | smallint | NO |
| PkAñoRappels | nvarchar | NO |
| PkRappels | nvarchar | NO |
| PkFkModulos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| FechaVigenciaDesde | datetime | NO |
| FechaVigenciaHasta | datetime | NO |
| FkObjetivoTipos | nvarchar | NO |
| FkRappelsPeriodoTipos | nvarchar | NO |
| FkRappelsRecuperacionTipos | nvarchar | NO |
| FkCampañas | nvarchar | YES |
| FkImportadoras | int | YES |
| FkRappelsBonificacionTipos | nvarchar | NO |
| CalcularSobrePrecioBase | bit | NO |
| CalcularSobrePrecioPintura | bit | NO |
| CalcularSobrePrecioOpcionales | bit | NO |
| CalcularSobrePrecioTransporte | bit | NO |
| CalcularSobreCompra | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| DescuentosAplicables | nvarchar | YES |
| FechaMod | datetime | NO |
