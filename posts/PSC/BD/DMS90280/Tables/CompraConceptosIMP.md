# Table: CompraConceptosIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkComprasIMP | bigint | NO |
| PkCompraConceptosIMP_Iden | smallint | NO |
| FkProcesos | int | YES |
| NumLineaFichero | int | YES |
| Concepto | nvarchar | YES |
| Descripcion | nvarchar | YES |
| Importe | decimal | YES |
| PorcImpuesto | decimal | YES |
| ImporteImpuesto | decimal | YES |
| FkImpuestos | nvarchar | YES |
| FkImpuestoTipos | nvarchar | YES |
| Dato1 | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
