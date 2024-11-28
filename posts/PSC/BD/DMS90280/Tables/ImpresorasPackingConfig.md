# Table: ImpresorasPackingConfig

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkImpresorasPackingConfig_Iden | smallint | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkSecciones | int | YES |
| FkRutasTransporte | nvarchar | YES |
| MesaEmpaquetado | nvarchar | YES |
| Impresora | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
