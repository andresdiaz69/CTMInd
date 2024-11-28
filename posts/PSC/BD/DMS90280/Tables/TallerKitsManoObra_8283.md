# Table: TallerKitsManoObra_8283

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkMarcas | smallint | NO |
| PkFkTallerKits | nvarchar | NO |
| PkTallerKitManoObra_Iden | int | NO |
| FkManoObraCodigos | nvarchar | YES |
| FkVariante | nvarchar | YES |
| Descripcion | nvarchar | NO |
| UT | int | YES |
| PrecioHora | decimal | YES |
| PorcDescuento | decimal | YES |
| FkManoObraTipos | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| OperacionPrincipal | bit | NO |
