# Table: MotivosAbono

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkMotivosAbono | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ExcepcionNotasDebito | bit | NO |
| AbonosAutomaticos | bit | NO |
| AbonosPiezasCanje | bit | NO |
| CorreccionDeTextos | bit | YES |
| ExcepcionNotasCredito | bit | NO |
| AbonosAutomaticosSalidasRE | bit | NO |
| DevolucionMaterial | bit | NO |
