# Table: CajasAnuladosDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkFkCajasDet | int | NO |
| FkCajasDet_Origen | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
