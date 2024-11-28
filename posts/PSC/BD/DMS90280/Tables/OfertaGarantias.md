# Table: OfertaGarantias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkOfertaGarantias_Iden | smallint | NO |
| FkGarantiaAdicionalTipos | nvarchar | NO |
| FkGarantiaAdicionalGrupos | nvarchar | NO |
| FechaInicio | datetime | NO |
| FkTerceros_Compañia | int | NO |
| FechaVencimiento | datetime | YES |
| KmsActuales | int | YES |
| KmsFin | int | YES |
| FechaFactura | datetime | YES |
| FechaContable | datetime | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| BaseImponible | decimal | NO |
| ImporteCiaSeguros | decimal | NO |
| FkImpuestos_Iva | nvarchar | NO |
| FkDepartamentos | nvarchar | YES |
| MesesDuracion | smallint | YES |
| FkGarantiaAdicionalTiposContables | nvarchar | YES |
| FechaMod | datetime | NO |
| ImpuestoPorc | decimal | YES |
| ImpuestoImporte | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| HorasUsoActuales | int | YES |
| HorasUsoFin | int | YES |
| KmsInicio | int | YES |
| HorasUsoInicio | int | YES |
| MesesAntiguedadInicio | smallint | YES |
| MesesAntiguedadFin | smallint | YES |
