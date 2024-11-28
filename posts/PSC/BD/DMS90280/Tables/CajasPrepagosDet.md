# Table: CajasPrepagosDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkFkCajasDet | int | NO |
| FkTerceros | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FkAñoAsiento_Conciliado | nvarchar | YES |
| FkAsientos_Conciliado | int | YES |
| FkEfectosNumDet | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
