# Table: spiga_ComisionesSpigaVN

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| Id | uniqueidentifier | NO |
| IdComisionSpiga | int | NO |
| Ano_Spiga | int | YES |
| Mes_Spiga | int | YES |
| Codigoempresa | smallint | NO |
| Empresa | nvarchar | NO |
| CodigoEmpresaSugerido | int | NO |
| EmpresaSugerida | nvarchar | NO |
| CodigoCentro | smallint | NO |
| Centro | nvarchar | NO |
| CodigoSeccion | int | NO |
| Seccion | nvarchar | NO |
| FechaFactura | datetime2 | NO |
| NumeroFactura | nvarchar | NO |
| VIN | nvarchar | YES |
| CodigoMArca | smallint | NO |
| Marca | nvarchar | NO |
| CodigoGama | smallint | NO |
| Gama | nvarchar | NO |
| CodigoModelo | nvarchar | NO |
| Extension | nvarchar | NO |
| AñoModelo | nvarchar | NO |
| Modelo | nvarchar | NO |
| CodigoVersion | nvarchar | NO |
| NombreVersion | nvarchar | NO |
| CedulaVendedor | bigint | YES |
| NombreVendedor | nvarchar | YES |
| Nit | nvarchar | YES |
| nombreTercero | nvarchar | YES |
| PrecioVehiculo | decimal | YES |
| PrecioLista | decimal | YES |
| ValorDto | decimal | YES |
| ImporteImpuestos | decimal | YES |
| TotalFactura | decimal | YES |
| FechaCancelacionFactura | datetime2 | YES |
| TotalCanceladoFactura | decimal | YES |
| FechaRemesa | datetime2 | YES |
| ValorRemesado | decimal | YES |
| FechaEntregaCliente | datetime2 | YES |
| DescuentoPolitica | decimal | YES |
| NumerEntregas | int | YES |
| Tipo_Servicio | nvarchar | NO |
| CuotaReteFuente | decimal | YES |
| EntregaEfectiva | int | NO |
| Procedencia | nvarchar | YES |
| ProcedenciaDetalle | nvarchar | YES |
| TipoOportunidad | nvarchar | YES |