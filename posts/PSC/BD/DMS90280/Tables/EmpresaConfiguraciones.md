# Table: EmpresaConfiguraciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkConfiguraciones | smallint | NO |
| PkEmpresaConfiguraciones_Iden | smallint | NO |
| Valor | nvarchar | NO |
| FechaDesde | datetime | NO |
| FechaHasta | datetime | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| FkMarcaTipos | smallint | YES |
