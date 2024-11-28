# Table: SituacionEfectosEstados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkSituacionEfectos_Actual | tinyint | NO |
| PkFkSituacionEfectos_Destino | tinyint | NO |
| FkSituacionEfectos_Anterior | tinyint | YES |
| Precarga | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PkSituacionEfectosEstados | tinyint | NO |
