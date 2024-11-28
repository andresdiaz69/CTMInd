# Table: GestionDocumentos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkDocumentosOperacionTipos | smallint | NO |
| PkFkDocumentos | smallint | NO |
| PkGestionDocumentos_Iden | int | NO |
| FkCentros_VN | smallint | YES |
| FkAñoExpediente_VN | nvarchar | YES |
| FkSeries_Expediente_VN | nvarchar | YES |
| FkNumExpediente_VN | int | YES |
| FkComprasNumDet_VN | smallint | YES |
| FKCentros_VO | smallint | YES |
| FkAñoExpediente_VO | nvarchar | YES |
| FkSeries_Expediente_VO | nvarchar | YES |
| FkNumExpediente_VO | int | YES |
| FkComprasNumDet_VO | smallint | YES |
| FechaEnvio | datetime | YES |
| FechaRecepcion | datetime | YES |
| Observaciones | nvarchar | YES |
| ObservacionesInternas | nvarchar | YES |
| FkTerceros_Envio | int | YES |
| FkTerceros_Recepcion | int | YES |
| Descartado | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpresas_OfertasFinanciacion | smallint | YES |
| FkAñoOfertasFinanciacion | nvarchar | YES |
| FkSeries_OfertasFinanciacion | nvarchar | YES |
| FkNumOfertasFinanciacion | int | YES |
