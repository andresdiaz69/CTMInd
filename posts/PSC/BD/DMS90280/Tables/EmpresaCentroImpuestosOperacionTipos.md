# Table: EmpresaCentroImpuestosOperacionTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkImpuestos | nvarchar | NO |
| PkFkRegimenContable | nvarchar | NO |
| PkFkRegimenContableImpuestoOperacionTipos | nvarchar | NO |
| FkContCtas_Debe | nvarchar | NO |
| FkContCtas_Haber | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PkEmpresaCentroImpuestosOperacionTipos_Iden | smallint | NO |
| FkImpuestoClasificaciones | nvarchar | YES |
