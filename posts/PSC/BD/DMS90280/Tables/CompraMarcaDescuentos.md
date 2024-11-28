# Table: CompraMarcaDescuentos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkCompraMarcaDescuentos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| DtoPorc | decimal | YES |
| DtoImporte | decimal | YES |
| PorDefecto | bit | NO |
| FkCompraDescuentoTipoInternos | smallint | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
