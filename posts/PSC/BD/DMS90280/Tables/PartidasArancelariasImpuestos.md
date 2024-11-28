# Table: PartidasArancelariasImpuestos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkPartidasArancelarias | nvarchar | NO |
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkImpuestosTipos | nvarchar | NO |
| FkImpuestos | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkPaises_Compra | nvarchar | YES |
| FkPaises_Origen | nvarchar | YES |
| PkPartidasArancelariasImpuestos_Iden | tinyint | NO |
| FkUsos | nvarchar | YES |
| CertificadoOrigen | bit | NO |
