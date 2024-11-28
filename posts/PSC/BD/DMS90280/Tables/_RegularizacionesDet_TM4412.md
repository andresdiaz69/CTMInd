# Table: _RegularizacionesDet_TM4412

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| EmpresaOrigen | smallint | NO |
| CentroOrigen | smallint | NO |
| PkFkAñoRegularizacion | int | YES |
| PkFkSeries | nvarchar | NO |
| PkFkRegularizacion | bigint | YES |
| PkRegularizacionesDet_Iden | bigint | YES |
| FKMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| Ubicacion | nvarchar | NO |
| Unidades | int | YES |
| FKCausaRegularizacion | varchar | NO |
| StockActual | int | NO |
| UserMod | int | NO |
| HostMod | varchar | NO |
| VersionFila | int | NO |
| FechaAlta | datetime | NO |
| FkClasificacion1 | nvarchar | YES |
| PrecioMedio | decimal | NO |
| Confirmado | int | NO |
| FechaMod | datetime | NO |
| FKTarifas | tinyint | NO |
| PrecioMedioPorEmpresa | int | YES |
| FactorCambioPMContrabalor | int | YES |
| PrecioMedioRegularizado | int | YES |
| SeccionOrigen | int | NO |
