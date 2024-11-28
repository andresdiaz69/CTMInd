# Table: Peritos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkPeritos_Iden | smallint | NO |
| Nombre | nvarchar | NO |
| Apellidos | nvarchar | NO |
| Nif | nvarchar | YES |
| Telefono | nvarchar | NO |
| OtrosTelefonos | nvarchar | YES |
| Fax | nvarchar | YES |
| Email | nvarchar | YES |
| Direccion | nvarchar | YES |
| Poblacion | nvarchar | YES |
| Provincia | nvarchar | YES |
| FkPaises | nvarchar | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
