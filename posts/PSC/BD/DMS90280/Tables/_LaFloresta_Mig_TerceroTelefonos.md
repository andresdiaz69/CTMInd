# Table: _LaFloresta_Mig_TerceroTelefonos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkTerceros | int | NO |
| PkTerceroTelefonos_Iden | smallint | NO |
| FkTelefonoTipos | tinyint | NO |
| CodigoTelefonico | nvarchar | YES |
| Numero | nvarchar | NO |
| Extension | nvarchar | YES |
| FkTerceroDirecciones | smallint | YES |
| DireccionPadre | bit | NO |
| Horario | nvarchar | YES |
| FechaBaja | smalldatetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Principal | bit | NO |
| FechaMod | smalldatetime | NO |
| FkTerceros_Direcciones | int | YES |
| FkPaises | nvarchar | YES |
