# Table: EmpresaCentroDocumentos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkEmpresaCentroDocumentos_Iden | smallint | NO |
| FkDocumentos | smallint | NO |
| FkMarcas | smallint | YES |
| FkDepartamentos | nvarchar | YES |
| FkCargoTipos | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkRecursos_logo | int | YES |
| FkTrabajoTipos | nvarchar | YES |
| FkTrabajoTiposMarca | nvarchar | YES |
