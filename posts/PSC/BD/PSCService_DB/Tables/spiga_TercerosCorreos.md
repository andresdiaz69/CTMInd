# Table: spiga_TercerosCorreos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| PkFkTerceros | int | YES |
| PkTerceroEmails_Iden | smallint | YES |
| FkEmailTipos | tinyint | YES |
| Email | nvarchar | YES |
| FkTerceroDirecciones | smallint | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | YES |
| HostMod | nvarchar | YES |
| VersionFila | tinyint | YES |
| DireccionPadre | bit | YES |
| Principal | bit | YES |
| FechaMod | datetime | YES |
| FkTerceros_Direcciones | int | YES |
