# Table: EmpresaCentroTipoRetenciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTipoRetenciones | smallint | NO |
| PkRetenciones | smallint | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| LocalFactEmitidas | bit | NO |
| LocalFactRecibidas | bit | NO |
| FkServicioTipos | smallint | YES |
| AutoliquidacionEmitidas | bit | NO |
| AutoliquidacionRecibidas | bit | NO |
