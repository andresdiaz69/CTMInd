# Table: TerceroDirecciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkTerceros | int | NO |
| PkTerceroDirecciones_Iden | smallint | NO |
| FkDireccionTipos | tinyint | NO |
| FkCalleTipos | nvarchar | NO |
| NombreCalle | nvarchar | NO |
| Numero | nvarchar | YES |
| Bloque | nvarchar | YES |
| Piso | nvarchar | YES |
| Puerta | nvarchar | YES |
| Complemento | nvarchar | YES |
| FkPaises | nvarchar | NO |
| FkCodigosPostales | nvarchar | YES |
| Poblacion | nvarchar | YES |
| Provincia | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Principal | bit | NO |
| FkEstados | nvarchar | YES |
| FkProvincias | nvarchar | YES |
| Complemento2 | nvarchar | YES |
| FechaMod | datetime | NO |
| FkPoblaciones | int | YES |
| CodigoCentro | smallint | YES |
