# Table: SubscripcionCambios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkSubscripcionCambios | int | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkMarcas | smallint | YES |
| TipoEntidad | nvarchar | YES |
| Entidad | nvarchar | YES |
| Subject | nvarchar | YES |
| FechaAlta | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Accion | nvarchar | YES |
| Suscriber | nvarchar | YES |
| Intentos | tinyint | YES |
