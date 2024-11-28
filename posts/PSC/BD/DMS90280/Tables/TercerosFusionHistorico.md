# Table: TercerosFusionHistorico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkTerceros_Definitivo | int | NO |
| PkFkTerceros_Eliminado | int | NO |
| PkFusionFecha | datetime | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkTerceroFusionCodigosError | smallint | YES |
| Descripcion | nvarchar | YES |
| FechaMod | datetime | NO |
| NombreTerceroEliminado | nvarchar | YES |
| NifCifTerceroEliminado | nvarchar | YES |
