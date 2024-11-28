# Table: ConceptosNominas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkConceptoNominas_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| FkConceptoNominas_1 | smallint | YES |
| FkConceptoNominas_2 | smallint | YES |
| SignoConcepto_1 | nvarchar | YES |
| SignoConcepto_2 | nvarchar | YES |
| FkContCtas_Haber | nvarchar | YES |
| FkContCtas_Debe | nvarchar | YES |
| FkEmpleadoTipoCuentasNominas_Haber | smallint | YES |
| FkEmpleadoTipoCuentasNominas_Debe | smallint | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| SignoAsiento | nvarchar | YES |
| FkImpresionConceptosNominas | smallint | YES |
| FechaMod | datetime | NO |
| FkCtaBancarias | smallint | YES |
| FkConceptosBancarios | nvarchar | YES |
