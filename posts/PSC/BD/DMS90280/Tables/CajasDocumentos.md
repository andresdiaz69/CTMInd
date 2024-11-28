# Table: CajasDocumentos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkFkCajasDet | int | NO |
| PkCajasDocumentos_Iden | smallint | NO |
| NumDocumento | nvarchar | YES |
| FechaVto | datetime | YES |
| Importe | decimal | YES |
| FechaTraspaso | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCajasDet_Traspaso | int | YES |
| FechaBaja | datetime | YES |
| FkBancoEntidades | nvarchar | YES |
| FechaExportacion | datetime | YES |
| FechaExportacionAnulacion | datetime | YES |
| FkCajasAnuladosDet_Parcial | int | YES |
