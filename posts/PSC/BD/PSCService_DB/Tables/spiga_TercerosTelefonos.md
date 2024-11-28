# Table: spiga_TercerosTelefonos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| PkFkTerceros | int | YES |
| PkTerceroTelefonos_Iden | smallint | YES |
| FkTelefonoTipos | tinyint | YES |
| CodigoTelefonico | nvarchar | YES |
| Numero | nvarchar | YES |
| Extension | nvarchar | YES |
| FkTerceroDirecciones | smallint | YES |
| DireccionPadre | bit | YES |
| Horario | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | YES |
| HostMod | nvarchar | YES |
| VersionFila | tinyint | YES |
| Principal | bit | YES |
| FechaMod | datetime | YES |
| FkTerceros_Direcciones | int | YES |
| FkPaises | nvarchar | YES |
