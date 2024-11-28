# Table: Mensajes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkAplicacionEventos | smallint | NO |
| PkMensajes_Iden | int | NO |
| Nombre | nvarchar | NO |
| Mensaje | nvarchar | NO |
| DestinatariosSMS | nvarchar | YES |
| DestinatariosEmail | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkFormatoTextoTipos | tinyint | YES |
| DestinatariosWhatsapp | nvarchar | YES |
| Plantilla | nvarchar | YES |
