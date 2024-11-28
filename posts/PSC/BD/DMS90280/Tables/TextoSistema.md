# Table: TextoSistema

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkTextoSistema_Iden | int | NO |
| FkTextoTipo | nvarchar | NO |
| FkCentros | smallint | YES |
| FkMarcas | smallint | YES |
| FkMR | nvarchar | YES |
| FkModulos | nvarchar | YES |
| Texto | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| FechaMod | datetime | NO |
| Codigo | nvarchar | YES |
