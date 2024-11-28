# Table: EmpresaCentroSeccionUbicaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkSecciones | int | NO |
| PkUbicaciones | nvarchar | NO |
| FkUbicaciones_Padre | nvarchar | YES |
| Descripcion | nvarchar | NO |
| Formato | nvarchar | NO |
| Mascara | nvarchar | NO |
| Orden | smallint | YES |
| FkMaterialTipos | nvarchar | YES |
| MasUnaReferencia | bit | NO |
| Alto | smallint | YES |
| Ancho | smallint | YES |
| Largo | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Principal | bit | NO |
| FechaMod | datetime | NO |
| UbicacionUlises | bit | NO |
| FkUbicacionesTipos | smallint | YES |
