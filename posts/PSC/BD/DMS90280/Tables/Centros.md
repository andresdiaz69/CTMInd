# Table: Centros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCentros | smallint | NO |
| Nombre | nvarchar | NO |
| Direccion | nvarchar | YES |
| Poblacion | nvarchar | YES |
| Provincia | nvarchar | YES |
| FkCodigosPostales | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkDireccionTipos | tinyint | YES |
| FkCalleTipos | nvarchar | YES |
| FkPaises | nvarchar | NO |
| Numero | nvarchar | YES |
| FechaMod | datetime | NO |
| CentroCoste | nvarchar | YES |
| BancoPropio | nvarchar | YES |
| IncluirCentroCosteEnClientes | bit | NO |
| Ubigeo | nvarchar | YES |
