# Table: Importes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkImportes | smallint | NO |
| Nombre | nvarchar | NO |
| Descripcion | nvarchar | NO |
| Esquema | nvarchar | NO |
| Procedimiento | nvarchar | NO |
| Tipo | nvarchar | NO |
| BaseImponible | bit | NO |
| BaseExenta | bit | NO |
| BaseNoSujeta | bit | NO |
| Coste | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FacturaPrincipal | tinyint | YES |
| FkImportes_Alternativo | smallint | YES |
| FkServicioTipos | smallint | YES |
| CancelaDeudaTerceroPagador | bit | NO |
