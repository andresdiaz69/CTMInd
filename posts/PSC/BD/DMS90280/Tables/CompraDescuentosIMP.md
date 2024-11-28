# Table: CompraDescuentosIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkComprasIMP | bigint | NO |
| PkCompraDescuentosIMP_Iden | bigint | NO |
| CodDescuento | nvarchar | NO |
| Descripcion | nvarchar | YES |
| DtoPorc | decimal | YES |
| DtoImporte | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkProcesos | int | YES |
