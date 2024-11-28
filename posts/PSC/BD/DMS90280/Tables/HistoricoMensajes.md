# Table: HistoricoMensajes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkHistoricoMensajes_Iden | bigint | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkSecciones | int | YES |
| FkAplicacionEventos | smallint | YES |
| FkMensajes | int | YES |
| FkEmpleados | smallint | YES |
| CodigoTelefonico | nvarchar | YES |
| NumeroTelefono | nvarchar | YES |
| Sentido | nvarchar | YES |
| FkMensajeTipos | tinyint | YES |
| FkMensajeEstados | tinyint | YES |
| CabeceraMensajeTexto | nvarchar | YES |
| CuerpoMensajeTexto | nvarchar | YES |
| PieMensajeTexto | nvarchar | YES |
| FechaAlta | datetime | YES |
| FechaModificacion | datetime | YES |
| CodMensajeExterno | nvarchar | YES |
| Plantilla | nvarchar | YES |
| CodWABA | nvarchar | YES |
| CodTelefonoCloud | nvarchar | YES |
| NumeroTelefonoCloud | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpleadosSecundario | smallint | YES |
| CodConversacion | nvarchar | YES |
| FechaExpiraConversacion | datetime | YES |
| CodConversacionTipo | nvarchar | YES |
| ErrorDetalles | nvarchar | YES |
