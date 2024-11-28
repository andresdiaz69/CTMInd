# Table: AsientosDetConciliados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAñoConciliacion | nvarchar | NO |
| PkNumConciliacion | int | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| PkFkAsientosDet | int | NO |
| Fecha | datetime | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ConciliacionBancaria | bit | YES |
