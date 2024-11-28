# Table: EmpresaCentroImpuestosDependientes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkImpuestos | nvarchar | NO |
| PkEmpresaCentroImpuestosDependientes_Iden | smallint | NO |
| FkImpuestos_Dependiente | nvarchar | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
