# Table: spiga_ComprasVehiculosVN

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | bigint | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| IdCentros | smallint | YES |
| AñoExpediente | nvarchar | YES |
| SerieExpediente | nvarchar | YES |
| NumExpediente | int | YES |
| ComprasNumDet | smallint | YES |
| IdVehiculos | int | YES |
| IdCompraTipos | nvarchar | YES |
| ImporteCompra | decimal | YES |
| IdSecciones | int | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FechaFactura | datetime | YES |
| BaseImponible | decimal | YES |
| FechaAsiento | datetime | YES |
| FechaRegistroRUNT | datetime | YES |
| ImporteIVA | decimal | YES |
| DescripcionCompraTipos | nvarchar | YES |
| IdMarcas | smallint | YES |
| IdGamas | smallint | YES |
| CodModelo | nvarchar | YES |
| ExtModelo | nvarchar | YES |
| AñoModelo | nvarchar | YES |
| IdVersiones | nvarchar | YES |
| Matricula | nvarchar | YES |
| VIN | nvarchar | YES |
| NombreMarca | nvarchar | YES |
| NombreGama | nvarchar | YES |
| NombreModelo | nvarchar | YES |
| DescripcionVersiones | nvarchar | YES |
| DescripcionSecciones | nvarchar | YES |
| IdCtaBancaria | smallint | YES |
| DescripcionCtaBancaria | nvarchar | YES |
| Nombre | nvarchar | YES |
| MonedaOrigen | nvarchar | YES |
| IdCompraUsos | nvarchar | YES |
| CodExternoModelo | nvarchar | YES |
| IdIncidenciaTipos | nvarchar | YES |
| IdTercerosActividadIncidenciaTipos | int | YES |
| IdActividadIncidenciaTipos | smallint | YES |
| IdActividadesDetIncidenciaTipos | smallint | YES |
| IncidenciaTiposDescripcion | nvarchar | YES |
| NumProformaFabrica | nvarchar | YES |
| IdCompraEstados | nvarchar | YES |
| IdComprasNumDet_Abonado | smallint | YES |
| FechaAlbaran | datetime | YES |
| FechaAsiento_Albaran | datetime | YES |
| SerieAlbaran | nvarchar | YES |
| NumAlbaran | nvarchar | YES |
| AñoAlbaran | nvarchar | YES |
| BaseImponible_Albaran | decimal | YES |
| FactorCambioMoneda_Albaran | decimal | YES |
| FechaRecepcion | datetime | YES |
| CodProveedor | int | YES |
| Proveedor | nvarchar | YES |