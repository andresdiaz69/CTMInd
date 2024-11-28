# Table: WFClasificacionesEntidades

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkWFClasificaciones | nvarchar | NO |
| PkFkWFEntidades | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| RequierePedido | bit | NO |
| Alquiler | bit | NO |
| FechaBaja | datetime | YES |
