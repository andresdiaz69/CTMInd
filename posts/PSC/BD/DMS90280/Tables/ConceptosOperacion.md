# Table: ConceptosOperacion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkConceptosOperacion | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FkConceptoOperacionTipos | nvarchar | NO |
| FkImpuestos | nvarchar | YES |
| FkImpuestoTipos | nvarchar | YES |
| ConceptoSistema | bit | NO |
| CargoCliente | bit | YES |
| FkModulos | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| NumDecimalesRedondeo | tinyint | NO |
| FechaMod | datetime | NO |
| PermitidoEnCompra | bit | NO |
| FkImpuestos_Compra | nvarchar | YES |
| PermitirEnGastosImportacion | bit | NO |
| Suplido | bit | NO |
| FkImpuestoTipos_Dependiente | nvarchar | YES |
