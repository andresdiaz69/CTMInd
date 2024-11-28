# Table: InformacionDIANImportacionBienesImpDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkImportacionBienes | int | NO |
| PkImportacionBienesImpDet_Iden | int | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| ImporteUSD | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaDocumentoTransporte | datetime | YES |
| NumDocumentoTransporte | nvarchar | YES |
| NumDeclaracionImportacion | nvarchar | YES |
| Declarado | bit | YES |
