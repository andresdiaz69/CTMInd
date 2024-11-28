# Table: EmpresaCentroMRProveedoresEnvio

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMR | nvarchar | NO |
| PkFkTerceros | int | NO |
| Email | nvarchar | YES |
| Fax | nvarchar | YES |
| Fichero | nvarchar | YES |
| Defecto | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkEnvioTipos | nvarchar | YES |
| FechaMod | datetime | NO |
| CodProveedor | nvarchar | YES |
| ProveedorMR | bit | NO |
| FkLineasDeNegocio | nvarchar | YES |
| PkEmpresaCentroMRProveedoresEnvio_Iden | smallint | NO |
