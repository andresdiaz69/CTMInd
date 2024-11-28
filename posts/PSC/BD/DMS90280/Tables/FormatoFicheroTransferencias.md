# Table: FormatoFicheroTransferencias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFormatoFicheroTransferencias | tinyint | NO |
| Descripcion | nvarchar | NO |
| FkRegimenContable | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkFormatoFicheroTransferenciaTipos | nvarchar | NO |
| FechaBaja | datetime | YES |
| PermiteMoneda | bit | NO |
