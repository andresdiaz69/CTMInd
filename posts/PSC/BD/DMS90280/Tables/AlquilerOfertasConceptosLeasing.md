# Table: AlquilerOfertasConceptosLeasing

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkAlquilerOfertas | smallint | NO |
| PkFkAlquilerConceptos | smallint | NO |
| FkGarantiaAdicionalTipos | nvarchar | YES |
| FkGarantiaAdicionalGrupos | nvarchar | YES |
| Importe | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
