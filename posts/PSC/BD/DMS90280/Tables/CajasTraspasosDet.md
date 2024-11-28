# Table: CajasTraspasosDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkFkCajasDet | int | NO |
| FkCtaBancarias | smallint | YES |
| FkCentros_Destino | smallint | YES |
| FkCajas_Destino | smallint | YES |
| FkCajasDet_Destino | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkContCtas_Contabilizacion | nvarchar | YES |
| FkCajasAnuladosDet_Parcial | int | YES |
