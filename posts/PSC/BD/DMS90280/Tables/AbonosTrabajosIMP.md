# Table: AbonosTrabajosIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkAbonosTrabajosIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| TipoRegistro | nvarchar | YES |
| NumFactura | nvarchar | YES |
| NumTrabajo | nvarchar | YES |
| NaturalezaGasto | nvarchar | YES |
| CodProveedorPiezaNueva | nvarchar | YES |
| CargoOabono | nvarchar | YES |
| TiempoDemanda | decimal | YES |
| TotalMODemanda | decimal | YES |
| TotalPiezasDemanda | decimal | YES |
| TotalLUDemanda | decimal | YES |
| TotalForfaitDemanda | decimal | YES |
| FechaRecepcionFactura | datetime | YES |
| TiempoCalculado | decimal | YES |
| TotalMOCalculado | decimal | YES |
| TotalPiezasCalculado | decimal | YES |
| TotalLUCalculado | decimal | YES |
| TotalForfaitCalculado | decimal | YES |
| IvaPorc | decimal | YES |
| IvaRecuperable | nvarchar | YES |
| ResponsableControl | nvarchar | YES |
| FechaAceptacion | datetime | YES |
| CodigoPuestoDMS | nvarchar | YES |
| CuentaPrimaria | nvarchar | YES |
| CuentaAgente | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
