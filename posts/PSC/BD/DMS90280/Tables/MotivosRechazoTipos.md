# Table: MotivosRechazoTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkMotivosRechazoTipos | smallint | NO |
| FkImportadoras | int | YES |
| FkMarcas | smallint | YES |
| FkActividadesTipos | smallint | YES |
| FkActividadesDetTipos | smallint | YES |
| Descripcion | nvarchar | NO |
| GenerarActividad | bit | NO |
| FechaPrevistaDias | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkOrigenRechazo | tinyint | YES |
| FechaBaja | datetime | YES |
| CodIntegracion | nvarchar | YES |
| Precarga | bit | NO |
