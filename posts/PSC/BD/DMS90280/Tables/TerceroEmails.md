# Table: TerceroEmails

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkTerceros | int | NO |
| PkTerceroEmails_Iden | smallint | NO |
| FkEmailTipos | tinyint | NO |
| Email | nvarchar | NO |
| FkTerceroDirecciones | smallint | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| DireccionPadre | bit | NO |
| Principal | bit | NO |
| FechaMod | datetime | NO |
| FkTerceros_Direcciones | int | YES |
