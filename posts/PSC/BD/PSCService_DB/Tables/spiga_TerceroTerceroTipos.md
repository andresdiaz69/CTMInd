# Table: spiga_TerceroTerceroTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| PkFkempresas | int | YES |
| PkFkcentros | int | YES |
| PkFkterceros | bigint | YES |
| PkFktercerotipos | nvarchar | YES |
| UserMod | bigint | YES |
| FechaAlta | datetime2 | YES |
| FechaMod | datetime2 | YES |
