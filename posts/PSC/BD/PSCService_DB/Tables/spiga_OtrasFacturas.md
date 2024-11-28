# Table: spiga_OtrasFacturas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| AñoElaboracion | nvarchar | YES |
| MesElaboracion | int | YES |
| CodEmpresa | smallint | YES |
| Empresa | nvarchar | YES |
| CodCentro | smallint | YES |
| Centro | nvarchar | YES |
| CodSeccion | int | YES |
| Seccion | nvarchar | YES |
| FechaFactura | datetime | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| TipoAsiento | nvarchar | YES |
| TipoDocumento | nvarchar | YES |
| TipoRegistro | nvarchar | YES |
| FormaPago | nvarchar | YES |
| Entidad | nvarchar | YES |
| Placa | nvarchar | YES |
| ReferenciaInterna | nvarchar | YES |
| NitCliente | nvarchar | YES |
| Cliente | nvarchar | YES |
| Base | decimal | YES |
| ValorIVA | decimal | YES |
| ValorRetenciones | decimal | YES |
| TotalFactura | decimal | YES |
| CedulaVendedor | int | YES |
| NombreVendedor | int | YES |
| IdEmpleadoAlta | smallint | YES |
| EmpleadoAlta | varchar | YES |
| IdUsuariosAlta | smallint | YES |
