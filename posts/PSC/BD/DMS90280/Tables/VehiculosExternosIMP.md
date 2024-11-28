# Table: VehiculosExternosIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkVehiculosExternosIMP | bigint | NO |
| VIN | nvarchar | NO |
| Matricula | nvarchar | YES |
| CodModeloComercial | nvarchar | YES |
| VersionComercial | nvarchar | YES |
| CodModeloTecnico | nvarchar | YES |
| NumeroMotor | nvarchar | YES |
| CodigoLlaves | nvarchar | YES |
| FechaMatriculacion | datetime | YES |
| CodConcesionarioFacturacion | nvarchar | YES |
| CodConcesionarioVenta | nvarchar | YES |
| Marca | nvarchar | YES |
| Gama | nvarchar | YES |
| FechaFabricacion | datetime | YES |
| FechaInicioGarantia | datetime | YES |
| FechaFinGarantia | datetime | YES |
| ExtensionGarantia | nvarchar | YES |
| FechaExtensionInicioGarantia | datetime | YES |
| FechaExtensionFinGarantia | datetime | YES |
| CodigoRadio | nvarchar | YES |
| CodigoColorExterior | nvarchar | YES |
| DescripcionColorExterior | nvarchar | YES |
| CodigoColorInterior | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
