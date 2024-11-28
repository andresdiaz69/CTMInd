# Table: AsientosDetCambios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| PkFkAsientosDet | int | NO |
| PkAsientosDetCambios_Iden | int | NO |
| FkContCtas | nvarchar | NO |
| ImporteDebe | decimal | NO |
| ImporteHaber | decimal | NO |
| FechaMod | datetime | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkMotivosAbono | nvarchar | YES |
