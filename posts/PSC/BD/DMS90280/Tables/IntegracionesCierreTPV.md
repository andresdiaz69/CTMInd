# Table: IntegracionesCierreTPV

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkIntegracionesCierreTPV_Iden | smallint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkFicheros | smallint | YES |
| FkWebServicesTipos | nvarchar | YES |
| Descripcion | nvarchar | YES |
| IntegracionManual | bit | YES |
| ConciliacionAutomatica | bit | YES |
| CampoConciliacion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
