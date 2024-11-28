# Table: ArticulosTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkArticulosTipos_Iden | int | NO |
| Descripcion | nvarchar | NO |
| Precarga | bit | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkServicioTipos | smallint | YES |
| GeneraAsiento | bit | NO |
