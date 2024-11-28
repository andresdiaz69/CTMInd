# Table: AsientoAutorizaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| SerieFactura | nvarchar | YES |
| SufijoFactura | nvarchar | YES |
| NumAutorizacionFactura | nvarchar | YES |
| FechaAutorizacionFactura | datetime | YES |
| SerieCertificado | nvarchar | YES |
| SufijoCertificado | nvarchar | YES |
| FechaAutorizacionCertificado | datetime | YES |
| NumCertificado | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| NumAutorizacionCertificado | nvarchar | YES |
| CodSustento | nvarchar | YES |
| TipoComprobante | nvarchar | YES |
| ContadorCompras | smallint | YES |
| FkCodigosSustento | nvarchar | YES |
| DocumentoInterno | bit | YES |
| FechaAsientoRetencion | datetime | YES |
| PagoExterior | bit | YES |
| TipoRegimenFiscal | nvarchar | YES |
| PagoExtSujetoRetencion | bit | YES |
| ConvDobleTributacion | bit | YES |
