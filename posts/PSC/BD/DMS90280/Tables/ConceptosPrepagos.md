# Table: ConceptosPrepagos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkConceptosPrepagos_Iden | smallint | NO |
| Concepto | nvarchar | YES |
| FkContCtas | nvarchar | YES |
| FkCtaBancarias | smallint | YES |
| FkConceptosBancarios | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
