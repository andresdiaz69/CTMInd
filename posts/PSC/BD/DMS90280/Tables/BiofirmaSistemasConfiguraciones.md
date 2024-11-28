# Table: BiofirmaSistemasConfiguraciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkBiofirmaSistemasConfiguraciones_Iden | smallint | NO |
| Nombre | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FkBiofirmaSistemas | smallint | NO |
| RutaAplicacion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| TipoMarcaTemporal | nvarchar | YES |
