# Table: PlantillasCalculo

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPlantillasCalculo | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| FkModulos | nvarchar | NO |
| Modificable | bit | NO |
| FkPlantillasCalculo_Asociada | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkFacturaTipos | nvarchar | NO |
| PlantillaMigracion | bit | NO |
| FechaMod | datetime | NO |
| FkRegistroTipos | nvarchar | YES |
