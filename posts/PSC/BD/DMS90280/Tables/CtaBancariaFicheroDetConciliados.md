# Table: CtaBancariaFicheroDetConciliados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAñoConciliacion | nvarchar | NO |
| PkNumConciliacion | int | NO |
| FkCtaBancarias | smallint | YES |
| FkCtaBancariaFicheros | int | YES |
| FkCtaBancariaFicherosDet | smallint | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FkAsientosDet | int | YES |
| FechaConciliacion | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpleados | smallint | YES |
| PkCtaBancariaFicheroDetConciliado_Iden | smallint | NO |
