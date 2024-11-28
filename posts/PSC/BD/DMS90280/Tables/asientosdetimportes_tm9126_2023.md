# Table: asientosdetimportes_tm9126_2023

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| PkFkAsientosDet | int | NO |
| PkFkImportes | smallint | NO |
| PkFkSerieTipos | nvarchar | NO |
| PkAsientosDetImportes_Iden | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Importe | decimal | YES |
| PorcReparto | decimal | YES |
| FkContCtas_GrupoPartidas | nvarchar | YES |
