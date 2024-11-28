# Table: OfertasFinanciacionTercerosRelacionados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PKFkAñoOfertasFinanciacion | nvarchar | NO |
| PkFkSeries_OfertasFinanciacion | nvarchar | NO |
| PkFkNumOfertasFinanciacion | int | NO |
| PkOfertasFinanciacionTercerosRelacionados_Iden | smallint | NO |
| FkTerceroClases | tinyint | NO |
| FkOfertasFinanciacionTercerosRelacionadosTipos | tinyint | NO |
| Contacto | nvarchar | YES |
| Relacion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTerceros | int | YES |
