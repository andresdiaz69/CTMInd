# Table: OfertaVOAplicacionesMensajes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertasVO | smallint | NO |
| PkFkAplicaciones | nvarchar | NO |
| PkOfertaVOAplicacionesMensajes_Iden | smallint | NO |
| Mensaje | nvarchar | NO |
| FechaAlta | datetime | NO |
| Procedencia | nvarchar | YES |
| TipoMensaje | nvarchar | YES |
| FechaProcesado | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
