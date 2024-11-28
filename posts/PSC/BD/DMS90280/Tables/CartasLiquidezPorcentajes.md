# Table: CartasLiquidezPorcentajes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCartasLiquidezPorcentajes_Iden | smallint | NO |
| FkModulos | nvarchar | NO |
| FkAsientoGestionEliminacion | nvarchar | NO |
| FkMonedas | smallint | NO |
| Editable | bit | NO |
| Porcentaje | decimal | NO |
| FkEmpresas_Plantillas | smallint | NO |
| FkCentros_Plantillas | smallint | NO |
| FkPlantillas | nvarchar | NO |
| FkPaises | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkAsientoGestionEliminacionDet | smallint | NO |
