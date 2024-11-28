# Table: PostalesClientes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPostalesClientes_Iden | bigint | NO |
| FkTerceros | int | YES |
| FkVehiculos | int | YES |
| CodConcesionario | nvarchar | NO |
| DescripcionConcesionario | nvarchar | YES |
| CodTaller | nvarchar | YES |
| DescripcionTaller | nvarchar | YES |
| Matricula | nvarchar | NO |
| FechaRevision | datetime | YES |
| ErrorCodP | nvarchar | YES |
| Cliente | nvarchar | NO |
| KmUltRevision | int | YES |
| FechaUltRevision | datetime | YES |
| KmProximaRevision | int | YES |
| Plano | nvarchar | YES |
| ModeloComercial | nvarchar | YES |
| Telefono | nvarchar | YES |
| Dni | nvarchar | YES |
| TipoPostal | nvarchar | YES |
| CategVehiculo | nvarchar | YES |
| DescripcionCategVehiculo | nvarchar | YES |
| NumMeses | nvarchar | YES |
| GamaComercial | nvarchar | YES |
| DescripcionModelo | nvarchar | YES |
| Direccion1 | nvarchar | YES |
| Direccion2 | nvarchar | YES |
| CodPostal | smallint | YES |
| ExtCodPostal | nvarchar | YES |
| DescripcionCodPostal | nvarchar | YES |
| Movil | nvarchar | YES |
| email | nvarchar | YES |
| FechaNacimiento | datetime | YES |
| ConcCoordinacion | nvarchar | YES |
| FkEmpresas_OT | smallint | YES |
| FkCentros_OT | smallint | YES |
| FkAñoOT | nvarchar | YES |
| FkSeries_OT | nvarchar | YES |
| FkNumOT | int | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
