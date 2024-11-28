# Table: Eventos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkEventos_Iden | int | NO |
| FkMarcas | smallint | NO |
| FechaInicio | datetime | NO |
| FechaFin | datetime | NO |
| Descripcion | nvarchar | YES |
| Central | bit | NO |
| MaximoInvitados | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaBaja | datetime | YES |
| FechaMod | datetime | NO |
