# Table: TerceroVehiculos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| Matricula | nvarchar | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkCodModelo | nvarchar | YES |
| FkExtModelo | nvarchar | YES |
| FkAñoModelo | nvarchar | YES |
| FkVersiones | nvarchar | YES |
| Modelo | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| KmAnuales | int | YES |
| FkModulos | nvarchar | YES |
| FkEmpleados_Vendedor | smallint | YES |
| FechaVenta | datetime | YES |
| PkTerceroVehiculos_Iden | smallint | NO |
| VIN | nvarchar | YES |
| FkTerceros_Conductor | int | YES |
| FkTerceros_Alquilador | int | YES |
| FechaFabricacion | datetime | YES |
| FechaMatriculacion | datetime | YES |
| FechaInicioGarantia | datetime | YES |
| FechaFinGarantia | datetime | YES |
| Codificado | bit | YES |
| Marca | nvarchar | YES |
| Kms | int | YES |
