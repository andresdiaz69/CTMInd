# Table: VehiculosIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkVehiculosIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| CodigoVehiculo | nvarchar | YES |
| VIN | nvarchar | YES |
| Matricula | nvarchar | YES |
| Comision | nvarchar | YES |
| Marca | nvarchar | NO |
| Gama | nvarchar | YES |
| CodModelo | nvarchar | YES |
| ExtModelo | nvarchar | YES |
| AñoModelo | nvarchar | YES |
| Version | nvarchar | YES |
| NumeroMotor | nvarchar | YES |
| CodigoLlaves | nvarchar | YES |
| FechaMatriculacion | datetime | YES |
| FechaFabricacion | datetime | YES |
| FechaInicioGarantia | datetime | YES |
| FechaFinGarantia | datetime | YES |
| ExtensionGarantia | nvarchar | YES |
| FechaExtensionInicioGarantia | datetime | YES |
| FechaExtensionFinGarantia | datetime | YES |
| CodigoRadio | nvarchar | YES |
| CodigoColorExterior | nvarchar | YES |
| DescripcionColorExterior | nvarchar | YES |
| CodigoInterior | nvarchar | YES |
| DescripcionInterior | nvarchar | YES |
| CodigoFabricacion | nvarchar | YES |
| Peso | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMarcas | smallint | YES |
| FechaProceso | datetime | YES |
| Observaciones | nvarchar | YES |
| CodIMPPadre | bigint | YES |
| KmsActuales | int | YES |
