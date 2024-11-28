# Table: GarantiaAdicionalGrupoDetalle

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkGarantiaAdicionalTipos | nvarchar | NO |
| PkFkGarantiaAdicionalGrupos | nvarchar | NO |
| PkGarantiaAdicionalGrupoDetalle_Iden | smallint | NO |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkCodModelo | nvarchar | YES |
| FkExtModelo | nvarchar | YES |
| FkAñoModelo | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
