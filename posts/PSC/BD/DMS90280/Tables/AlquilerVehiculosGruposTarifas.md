# Table: AlquilerVehiculosGruposTarifas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAlquilerVehiculosGrupos | smallint | NO |
| PkAlquilerVehiculosGruposTarifas_Iden | smallint | NO |
| FkAlquilerTarifas | smallint | NO |
| FechaDesde | datetime | NO |
| FechaHasta | datetime | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
