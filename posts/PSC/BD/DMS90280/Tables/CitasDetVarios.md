# Table: CitasDetVarios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCitas | int | NO |
| PkFkCitasDet | smallint | NO |
| PkCitasDetVarios_Iden | smallint | NO |
| FkVariosCodigos | nvarchar | YES |
| Descripcion | nvarchar | NO |
| PorcDescuento | decimal | NO |
| Unidades | decimal | NO |
| Precio | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkVariosCodigosInternos | nvarchar | YES |
| FechaMod | datetime | NO |
| CodExterno | nvarchar | YES |
