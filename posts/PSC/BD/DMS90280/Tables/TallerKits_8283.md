# Table: TallerKits_8283

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkMarcas | smallint | NO |
| PkTallerKits | nvarchar | NO |
| FkGamas | smallint | YES |
| FkCodModelo_Like | nvarchar | YES |
| FkExtModelo | nvarchar | YES |
| FkAñoModelo | nvarchar | YES |
| FkVersiones | nvarchar | YES |
| FechaDesde | datetime | NO |
| FechaHasta | datetime | YES |
| Descripcion | nvarchar | NO |
| OfertaVN | bit | YES |
| OfertaVO | bit | YES |
| UTFija | bit | NO |
| PrecioMOFijo | bit | NO |
| PrecioMatFijo | bit | NO |
| FkTarifas | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PrecioCerrado | decimal | YES |
| FkTallerKitsTipos | nchar | NO |
| Observaciones | nvarchar | YES |
| ImporteKit | decimal | YES |
| DetallarKitImpresion | bit | NO |
