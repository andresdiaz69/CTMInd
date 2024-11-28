# Table: EmpresaTercerosContratos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTerceros | int | NO |
| PkEmpresaTercerosContratos_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| FkTerceroContratoTipos | nvarchar | YES |
| FkAreaTipos | smallint | YES |
| FechaVigenciaInicio | datetime | YES |
| FechaVigenciaFin | datetime | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Contador | int | YES |
