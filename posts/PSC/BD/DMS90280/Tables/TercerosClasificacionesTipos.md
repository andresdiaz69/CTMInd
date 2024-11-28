# Table: TercerosClasificacionesTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkTercerosClasificacionesTipos | smallint | NO |
| Nombre | nvarchar | NO |
| Descripcion | nvarchar | NO |
| Activo | bit | NO |
| Obligatorio | bit | NO |
| VisibleTerceros | bit | NO |
| VisibleClientesPotenciales | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTerceroClases | tinyint | YES |
