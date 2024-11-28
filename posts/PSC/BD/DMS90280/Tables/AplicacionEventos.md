# Table: AplicacionEventos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkAplicacionEventos_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| FkModulos | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| MensajesAutomaticos | bit | NO |
| PermiteSMS | bit | NO |
| PermiteEMail | bit | NO |
| Visible | bit | NO |
| FechaMod | datetime | NO |
| PermiteActividades | bit | NO |
| PermiteTextosConfigurables | bit | NO |
| DuplicaActividad | bit | YES |
| PermiteWhatsapp | bit | NO |
