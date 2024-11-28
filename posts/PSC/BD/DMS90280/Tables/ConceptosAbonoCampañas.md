# Table: ConceptosAbonoCampañas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkConceptosAbonoCampañas_Iden | smallint | NO |
| Concepto | nvarchar | YES |
| FkContCtas | nvarchar | YES |
| FechaBaja | datetime | YES |
| FkAsientosDetTipos | tinyint | YES |
| FkReclamacionTipos | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
