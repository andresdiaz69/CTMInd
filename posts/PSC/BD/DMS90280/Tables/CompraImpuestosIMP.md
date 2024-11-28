# Table: CompraImpuestosIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkComprasIMP | bigint | NO |
| PkCompraImpuestosIMP_Iden | smallint | NO |
| FkImpuestos | nvarchar | YES |
| FkImpuestoTipos | nvarchar | YES |
| Porc | decimal | YES |
| Importe | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| BaseImponible | decimal | YES |
| FkConceptosOperacion | nvarchar | YES |
| FkProcesos | int | YES |
