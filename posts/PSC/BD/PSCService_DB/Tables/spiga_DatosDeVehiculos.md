# Table: spiga_DatosDeVehiculos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | bigint | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdVehiculos | int | YES |
| CodModelo | nvarchar | YES |
| ExtModelo | nvarchar | YES |
| AñoModelo | nvarchar | YES |
| IdVersiones | nvarchar | YES |
| VIN | nvarchar | YES |
| Matricula | nvarchar | YES |
| Comision | nvarchar | YES |
| FechaUltimaITV | datetime | YES |
| FechaProximaITV | datetime | YES |
| CodigoITV | nvarchar | YES |
| EmisionesCO2ITV | decimal | YES |
| IdTerceros_Propietario | int | YES |
| CodigoFabricacion | nvarchar | YES |
| IdModeloPV | nvarchar | YES |
| IdMarcasExterna | smallint | YES |
| IdGamasExterna | smallint | YES |
| CodModeloExterna | nvarchar | YES |
| ExtModeloExterna | nvarchar | YES |
| AñoModeloExterna | nvarchar | YES |
| IdVersionesExterna | nvarchar | YES |
| MesAñoCTR | nvarchar | YES |
| NumRegistroImportacion | nvarchar | YES |
| NumCertificadoPruebaDinamica | nvarchar | YES |
| IdMarcas | smallint | YES |
| NombreMarca | nvarchar | YES |
| NombreConductor | nvarchar | YES |
| NumeroMotor | nvarchar | YES |
| NombreModelo | nvarchar | YES |
| IdGamas | smallint | YES |
| NombreGama | nvarchar | YES |
| NombreVersion | nvarchar | YES |
| IdCombustibleTipos | nvarchar | YES |
| Activo | bit | YES |
| IdMarcaTallerModelos | nvarchar | YES |
| DescripcionModeloTaller | nvarchar | YES |
| VersionFila | tinyint | YES |
| DescripcionTipoCombustible | nvarchar | YES |
| FechaMatriculacion | datetime | YES |
| FechaAlta | datetime | YES |
| CodigoMantenimiento | nvarchar | YES |
| IdContratoTipos | nvarchar | YES |
| FechaDespacho | datetime | YES |
| FechaInicioGarantia | datetime | YES |
| Nombre | nvarchar | YES |
| Apellido1 | nvarchar | YES |
| Apellido2 | nvarchar | YES |
| FechaVenta | datetime | YES |
| FechaVentaVO | datetime | YES |
| FechaBaja | datetime | YES |
| KmsActuales | int | YES |
| HorasUsoActual | int | YES |
| ExisteVN | int | YES |
| ExisteVO | int | YES |
| FechaUltimaOT | datetime | YES |
| FechaFinGarantiaMecanica | datetime | YES |
| FechaFinGarantiaPintura | datetime | YES |
| FechaFinGarantiaChapa | datetime | YES |
| IdPaisesOrigen | nvarchar | YES |