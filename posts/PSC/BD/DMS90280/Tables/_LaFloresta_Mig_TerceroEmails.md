# Table: _LaFloresta_Mig_TerceroEmails

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkTerceros | int | NO |
| PkTerceroEmails_Iden | smallint | NO |
| FkEmailTipos | tinyint | NO |
| Email | nvarchar | NO |
| FkTerceroDirecciones | smallint | YES |
| FechaBaja | smalldatetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| DireccionPadre | bit | NO |
| Principal | bit | NO |
| FechaMod | smalldatetime | NO |
| FkTerceros_Direcciones | int | YES |
