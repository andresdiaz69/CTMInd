# Table: FasesDetalle

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkIdentificadorFase | int | NO |
| PkFkSecciones | int | NO |
| PkFkFases | nvarchar | NO |
| FkCentros | smallint | YES |
| FkAñoPresupuesto | nvarchar | YES |
| FkSeries_Presupuesto | nvarchar | YES |
| FkNumPresupuesto | int | YES |
| FkAñoOT | nvarchar | YES |
| FkSeries_OT | nvarchar | YES |
| FkNumOT | int | YES |
| FkNumTrabajo | tinyint | YES |
| PorcTiempo | decimal | YES |
| Tiempo | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PorcBase | decimal | YES |
| RatioTaller | decimal | YES |
