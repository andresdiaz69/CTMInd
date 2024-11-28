# Table: EmpresaCentroTipoRetencionesDesdeHastaDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTipoRetenciones | smallint | NO |
| PkFkRetenciones | smallint | NO |
| PkFkRetencionesFechaDesde | datetime | NO |
| PkEmpresaCentroTipoRetencionesDesdeHastaDet_Iden | smallint | NO |
| FkRegimenContable | nvarchar | YES |
| FkTipoContribuyente_Vendedor | nvarchar | YES |
| FkTipoContribuyente_Comprador | nvarchar | YES |
| FkContCtas_Emitidas | nvarchar | YES |
| FkContCtas_Recibidas | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
