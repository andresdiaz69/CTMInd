# Table: TipoRetencionesInterno

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkTipoRetencionesInterno | tinyint | NO |
| Descripcion | nvarchar | NO |
| BI | bit | NO |
| BE | bit | NO |
| BNS | bit | NO |
| IVA | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Interno | bit | NO |
| AutoliquidacionEmitidas | bit | NO |
| FkFacturaTipos | nvarchar | YES |
| MomentoContabilizacion | nvarchar | YES |
| TotalFactura | bit | NO |
| AdmiteAbonosEmitidas | bit | NO |
| AdmiteAbonosRecibidas | bit | NO |
| AutoliquidacionRecibidas | bit | NO |
| ContabilizarEnAsientoNuevo_Emitidas | bit | NO |
| ContabilizarEnAsientoNuevo_Recibidas | bit | NO |
| Decimales | int | YES |
