# Table: AlmacenesDireccionesEnvio

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMR | nvarchar | NO |
| PkAlmacenesDireccionesEnvio | nvarchar | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkSecciones | int | YES |
| FkLineasDeNegocio | nvarchar | YES |
