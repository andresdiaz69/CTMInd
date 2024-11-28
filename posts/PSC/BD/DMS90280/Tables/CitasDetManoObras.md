# Table: CitasDetManoObras

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCitas | int | NO |
| PkFkCitasDet | smallint | NO |
| PkCitaDetManoObras_Iden | smallint | NO |
| FkManoObraCodigos | nvarchar | YES |
| Descripcion | nvarchar | NO |
| FkManoObraTipos | smallint | NO |
| FkVariante | nvarchar | YES |
| UT | int | NO |
| PorcDescuento | decimal | NO |
| PrecioHora | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| MantenerPrecioDto | bit | NO |
| OperacionPrincipal | bit | NO |
| FkTarifaTaller | nvarchar | YES |
| CodExterno | nvarchar | YES |
