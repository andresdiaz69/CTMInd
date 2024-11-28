# Table: Incidencias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkIncidencias_Iden | int | NO |
| FechaHoraInicio | datetime | NO |
| FechaHoraFin | datetime | NO |
| FkIncidenciaTipos | smallint | NO |
| Justificante | bit | NO |
| ParteBaja | bit | NO |
| Observaciones | nvarchar | YES |
| MedioDiaInicio | bit | NO |
| MedioDiaFin | bit | NO |
| DiasNaturales | bit | NO |
| FechaAlta | datetime | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkIncidencias_Origen | int | YES |
| FechaMod | datetime | NO |
| Remunerada | bit | NO |
