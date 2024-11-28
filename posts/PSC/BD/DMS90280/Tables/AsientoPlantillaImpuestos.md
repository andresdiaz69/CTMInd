# Table: AsientoPlantillaImpuestos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkPlantillas | nvarchar | NO |
| PkFkAsientoPlantillas | smallint | NO |
| PkFkImpuestoTipos | nvarchar | NO |
| PkFkImpuestos | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkImpuestoClasificaciones | nvarchar | YES |
| PorcDeduccionIVA | decimal | YES |
