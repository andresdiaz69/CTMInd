# Table: AnticiposProveedorAsientos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAnticiposProveedor | int | NO |
| PkAnticiposProveedorAsientos_Iden | tinyint | NO |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| Importe | decimal | NO |
| UserAlta | smallint | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkContCtas | nvarchar | YES |
