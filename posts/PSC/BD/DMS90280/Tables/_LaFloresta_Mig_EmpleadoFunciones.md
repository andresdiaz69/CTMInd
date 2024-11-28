# Table: _LaFloresta_Mig_EmpleadoFunciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpleados | smallint | NO |
| PkEmpleadoFunciones_Iden | int | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkSecciones | int | NO |
| FechaAlta | smalldatetime | NO |
| FechaBaja | smalldatetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| PorcFuncion | decimal | YES |
| PorDefecto | bit | YES |
| FechaMod | smalldatetime | NO |
| FkFuncionesExternas | smallint | NO |
