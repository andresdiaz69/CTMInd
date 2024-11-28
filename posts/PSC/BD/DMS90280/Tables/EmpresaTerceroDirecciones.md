# Table: EmpresaTerceroDirecciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkTerceroDirecciones | smallint | NO |
| FkEmpleados_VendedorRecambios | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCentros_Facturacion | smallint | YES |
