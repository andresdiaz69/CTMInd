# Table: WFEntidadesEstados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkWFEntidades | smallint | NO |
| PkWFEstados | smallint | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Bloquea | bit | NO |
| FkFacturaEstados | tinyint | YES |
