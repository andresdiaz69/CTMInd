# Table: GarantiaAdicionalTiposDocumentos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkGarantiaAdicionalTipos | nvarchar | NO |
| PkFkDocumentos | smallint | NO |
| PorcDescuentoMO | decimal | YES |
| PorcDescuentoMAT | decimal | YES |
| FkMarcas | smallint | YES |
| FkTallerKits | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkClienteCategorias | smallint | YES |
