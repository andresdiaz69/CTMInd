# Table: ConfiguracionFollowUp

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkSecciones | int | NO |
| PkFkModulos | nvarchar | NO |
| PkConfiguracionFollowUp_Iden | smallint | NO |
| FkMarcas | smallint | YES |
| FkCargoTipos | nvarchar | YES |
| Cuestionario | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| FkVentaTipos_VN | nvarchar | YES |
| FkVentaTipos_VO | nvarchar | YES |
