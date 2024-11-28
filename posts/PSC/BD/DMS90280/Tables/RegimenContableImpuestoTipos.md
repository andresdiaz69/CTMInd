# Table: RegimenContableImpuestoTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkRegimenContable | nvarchar | NO |
| PkImpuestoTipos | nvarchar | NO |
| Descripcion | nvarchar | YES |
| BaseImponible | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkModulos | nvarchar | YES |
| CtaEmitidas | bit | NO |
| CtaRecibidas | bit | NO |
| FechaMod | datetime | NO |
| FkTipoRetencionesInterno | tinyint | YES |
| FkImpuestoTiposInternos | tinyint | YES |
| Dependiente | bit | NO |
