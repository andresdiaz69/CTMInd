# Table: PartidasArancelariasIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPartidasArancelariasIMP_Iden | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkFicheros | smallint | YES |
| FkProcesos | int | NO |
| FkPartidasArancelarias | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FechaBaja | datetime | YES |
| Cupo | decimal | YES |
| FkImpuestos | nvarchar | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkPaises_Compra | nvarchar | YES |
| FkPaises_Origen | nvarchar | YES |
| FkUsos | nvarchar | YES |
| CertificadoOrigen | bit | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
