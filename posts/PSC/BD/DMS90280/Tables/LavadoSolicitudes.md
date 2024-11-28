# Table: LavadoSolicitudes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkLavadoSolicitudes_Iden | int | NO |
| FkLavaderos | smallint | NO |
| FkLavados | int | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkAñoOT | nvarchar | YES |
| FkSeries | nvarchar | YES |
| FkNumOT | int | YES |
| FkCitas | int | YES |
| FechaAlta | datetime | NO |
| FkEmpleados | smallint | YES |
| FechaInicio | datetime | YES |
| FechaFin | datetime | YES |
| FkLavadoEstados | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaInicioPrevista | datetime | YES |
| FkEmpleados_Realizacion | smallint | YES |
