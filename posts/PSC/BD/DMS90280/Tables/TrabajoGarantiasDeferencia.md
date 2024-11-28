# Table: TrabajoGarantiasDeferencia

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkFkNumTrabajo | tinyint | NO |
| PkFkTerceros | int | NO |
| PkFkSecciones | int | NO |
| PkFkSeccionCargos | nvarchar | NO |
| FkCargoTipos | nvarchar | NO |
| PorcMO | decimal | YES |
| PorcMAT | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| NombreTercero | nvarchar | YES |
| FechaMod | datetime | NO |
| FkDepartamentos_CargoInterno | nvarchar | YES |
| FkImputacionTipos | smallint | YES |
| FkSecciones_CargoInterno | int | YES |
| FkCentros_Destino | smallint | YES |
