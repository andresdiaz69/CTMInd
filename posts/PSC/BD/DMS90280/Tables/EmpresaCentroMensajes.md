# Table: EmpresaCentroMensajes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkAplicacionEventos | smallint | NO |
| PkFkMensajes | int | NO |
| PkEmpresaCentroMensajes_Iden | int | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
