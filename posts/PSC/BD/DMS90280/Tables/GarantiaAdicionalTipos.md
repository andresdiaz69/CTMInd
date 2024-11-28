# Table: GarantiaAdicionalTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkGarantiaAdicionalTipos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FkMarcas | smallint | YES |
| KmsFin | int | YES |
| FechaVencimiento | datetime | YES |
| FkTerceros_CiaSeguros | int | NO |
| FkDepartamentos | nvarchar | YES |
| MesesDuracion | smallint | YES |
| Facturacion | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkGarantiaAdicionalTiposContables | nvarchar | YES |
| FechaMod | datetime | NO |
| GarantiaVOPorDefecto | bit | NO |
| GarantiaInterna | bit | NO |
| ImportacionVehiculosMatriculados | bit | NO |
| FkTipoGAMarca | nvarchar | YES |
| HorasUsoFin | int | YES |
| FkImputacionTipos | smallint | YES |
| Observaciones | nvarchar | YES |
| KmsInicio | int | YES |
| HorasUsoInicio | int | YES |
| MesesAntiguedadInicio | smallint | YES |
| MesesAntiguedadFin | smallint | YES |
| Modificable | bit | YES |
| ExtensionGarantia | bit | YES |
