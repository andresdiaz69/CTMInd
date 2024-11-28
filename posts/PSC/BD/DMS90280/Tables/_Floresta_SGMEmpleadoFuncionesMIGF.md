# Table: _Floresta_SGMEmpleadoFuncionesMIGF

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpleados | smallint | NO |
| PkEmpleadoFunciones_Iden | int | NO |
| PkFkEmpleados_D | smallint | YES |
| PkEmpleadoFunciones_Iden_D | int | YES |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkSecciones | int | NO |
| FechaAlta | smalldatetime | NO |
| FechaBaja | smalldatetime | YES |
| UserMod | int | NO |
| HostMod | varchar | NO |
| VersionFila | int | NO |
| PorcFuncion | decimal | YES |
| PorDefecto | int | YES |
| FechaMod | datetime | NO |
| FkFuncionesExternas | smallint | NO |
