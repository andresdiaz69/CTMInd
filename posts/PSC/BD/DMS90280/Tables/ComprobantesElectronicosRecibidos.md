# Table: ComprobantesElectronicosRecibidos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkComprobanteElectronicoRecibido_Iden | int | NO |
| FechaAlta | datetime | NO |
| NifCif | nvarchar | YES |
| SerieNumFactura | nvarchar | YES |
| TotalFactura | decimal | YES |
| XMLRecibido | nvarchar | YES |
| FkComprobanteElectronicoAprobaciones | tinyint | YES |
| FechaEmision | datetime | YES |
| NombreTercero | nvarchar | YES |
| FkTerceros | int | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| MotivoRechazoAprobacionComercial | nvarchar | YES |
| FkComprobanteElectronicoEstados | tinyint | YES |
| FkRegimenContable | nvarchar | YES |
| FkTipoComprobantes | nvarchar | YES |
