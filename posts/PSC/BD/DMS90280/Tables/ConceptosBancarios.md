# Table: ConceptosBancarios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkConceptosBancarios | nvarchar | NO |
| Denominacion | nvarchar | YES |
| Precarga | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| FkRegimenContable | nvarchar | YES |
| Ingreso | bit | YES |
| Egreso | bit | YES |
| FkInformacionDIANTipos | smallint | YES |
