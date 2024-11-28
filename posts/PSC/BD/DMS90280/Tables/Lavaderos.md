# Table: Lavaderos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkLavaderos_Iden | smallint | NO |
| FkTerceros | int | YES |
| Descripcion | nvarchar | NO |
| FkLavaderoTipos | tinyint | NO |
| TiempoDisponibleGeneral | smallint | YES |
| TiempoDisponibleVNVO | smallint | YES |
| HoraInicio | datetime | YES |
| HoraFin | datetime | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| CodigoLavadero | nvarchar | YES |
