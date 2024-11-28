# Table: TallerCampañas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkTallerCampañas | nvarchar | NO |
| PkCampañaVariante | nvarchar | NO |
| FechaInicio | datetime | NO |
| FechaFin | datetime | YES |
| Descripcion | nvarchar | NO |
| AvisarCliente | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkTallerCampañasTipos | nvarchar | YES |
| FechaMod | datetime | NO |
| Territorio | nvarchar | YES |
| Factoria | nvarchar | YES |
| Word | nvarchar | YES |
| Observaciones | nvarchar | YES |
