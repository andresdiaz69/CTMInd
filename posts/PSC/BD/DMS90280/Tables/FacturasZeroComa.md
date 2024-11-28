# Table: FacturasZeroComa

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFacturasZeroComa_Iden | int | NO |
| FkTerceros | int | NO |
| SerieFactura | nvarchar | NO |
| NumFactura | nvarchar | NO |
| AñoFactura | nvarchar | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FechaContable | datetime | YES |
| FechaFactura | datetime | YES |
| FkFacturaEstados | tinyint | YES |
| TipoFactura | nvarchar | YES |
| FkRegistroTipos | nvarchar | YES |
| ReferenciaInterna | nvarchar | YES |
| FkPagoFormas | nvarchar | YES |
| FkCentros | smallint | YES |
| FkPlantillas | nvarchar | YES |
| ImporteTotal | decimal | YES |
| Url | nvarchar | YES |
| FkSerie_Expediente_VO | nvarchar | YES |
| FkNumExpediente_VO | int | YES |
| FkAñoExpediente_VO | nvarchar | YES |
| VIN | nvarchar | YES |
| FechaImportacion | datetime | YES |
| FkSeries_Expediente_VN | nvarchar | YES |
| FkNumExpediente_VN | int | YES |
| FkAñoExpediente_VN | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Comentarios | nvarchar | YES |
| ObservacionesImportacion | nvarchar | YES |
| XmlEnvio | nvarchar | YES |
| Depurado | bit | YES |
| FkContCtasProveedor | nvarchar | YES |
| SerieAlbaran | nvarchar | YES |
| NumAlbaran | nvarchar | YES |
| AñoAlbaran | nvarchar | YES |
| ImporteBaseTotal | decimal | YES |
| PorcentajeTotal | decimal | YES |
| AlbaranNoEncontrado | bit | YES |
| FkMR | nvarchar | YES |
