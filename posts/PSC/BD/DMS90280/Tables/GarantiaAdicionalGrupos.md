# Table: GarantiaAdicionalGrupos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkGarantiaAdicionalTipos | nvarchar | NO |
| PkGarantiaAdicionalGrupos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| BaseImponible | decimal | NO |
| ImporteCiaSeguros | decimal | NO |
| FechaVencimiento | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkImpuestos | nvarchar | NO |
| FkImpuestoTipos | nvarchar | NO |
| FechaMod | datetime | NO |
| FkConceptosOperacion_TipoGarantia | nvarchar | NO |
