# Table: spiga_TercerosDirecciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| PkFkTerceros | int | YES |
| PkTerceroDirecciones_Iden | smallint | YES |
| FkDireccionTipos | tinyint | YES |
| FkCalleTipos | nvarchar | YES |
| NombreCalle | nvarchar | YES |
| Numero | nvarchar | YES |
| Bloque | nvarchar | YES |
| Piso | nvarchar | YES |
| Puerta | nvarchar | YES |
| Complemento | nvarchar | YES |
| FkPaises | nvarchar | YES |
| FkCodigosPostales | nvarchar | YES |
| Poblacion | nvarchar | YES |
| Provincia | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | YES |
| HostMod | nvarchar | YES |
| VersionFila | tinyint | YES |
| Principal | bit | YES |
| FkEstados | nvarchar | YES |
| FkProvincias | nvarchar | YES |
| Complemento2 | nvarchar | YES |
| FechaMod | datetime | YES |
| FkPoblaciones | int | YES |
