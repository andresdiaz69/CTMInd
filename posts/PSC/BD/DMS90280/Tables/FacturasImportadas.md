# Table: FacturasImportadas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| PkFacturasImportadas_Iden | int | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FkFacturaEstados | tinyint | YES |
| FkMonedas | smallint | YES |
| FKDocumentoEmitidoTipos | smallint | YES |
| FkEntidades | nvarchar | YES |
| FkPlantillas | nvarchar | YES |
| FkTerceros | int | YES |
| NombreTercero | nvarchar | YES |
| NifTercero | nvarchar | YES |
| NifEmpresa | nvarchar | YES |
| NombreEmpresa | nvarchar | YES |
| IdWFDocumento | nvarchar | YES |
| NumDocumento | nvarchar | YES |
| FechaDocumento | datetime | YES |
| TotalDocumento | decimal | YES |
| BaseImponible | decimal | YES |
| TotalIva | decimal | YES |
| ImporteRetencion | decimal | YES |
| BaseIva1 | decimal | YES |
| BaseIva2 | decimal | YES |
| BaseIva3 | decimal | YES |
| PorcIva1 | decimal | YES |
| PorcIva2 | decimal | YES |
| PorcIva3 | decimal | YES |
| URL | nvarchar | YES |
| Comentarios | nvarchar | YES |
| ObservacionesSpiga | nvarchar | YES |
| FechaImportacion | datetime | YES |
| Error | bit | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaAprobacion | datetime | YES |
| FechaNotificacion | datetime | YES |
| FechaWS | datetime | YES |
| Notificacion | nvarchar | YES |
| UserID | nvarchar | YES |
| Anulado | bit | YES |
| CentrosAprobacion | nvarchar | YES |
| PendientesDeTratar | bit | YES |
| FkCentrosPlantilla | smallint | YES |
