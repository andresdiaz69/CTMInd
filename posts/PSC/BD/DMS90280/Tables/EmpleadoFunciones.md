# Table: EmpleadoFunciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpleados | smallint | NO |
| PkEmpleadoFunciones_Iden | int | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkSecciones | int | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| PorcFuncion | decimal | YES |
| PorDefecto | bit | YES |
| FechaMod | datetime | NO |
| FkFuncionesExternas | smallint | NO |
