# Table: VehiculosOpcionalesIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkVehiculosOpcionalesIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| VIN | nvarchar | YES |
| Matricula | nvarchar | YES |
| Comision | nvarchar | YES |
| CodigoVehiculo | nvarchar | YES |
| CodigoExtra | nvarchar | YES |
| Descripcion | nvarchar | YES |
| FkOpcionalTipos | nvarchar | YES |
| TipoEquipamiento | nvarchar | YES |
| TipoPintura | nvarchar | YES |
| DescripcionTipoEquipamiento | nvarchar | YES |
| DescripcionTipoPintura | nvarchar | YES |
| ListaOpcionales | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
