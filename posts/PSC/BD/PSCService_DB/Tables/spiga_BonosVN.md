# Table: spiga_BonosVN

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| IdMarcas | smallint | YES |
| IdCompraCampañas | smallint | YES |
| IdCampañas | nvarchar | YES |
| FechaAsiento_Reclamacion | datetime | YES |
| FechaAsientoAbonoAgente | datetime | YES |
| FechaAsientoAbonoConces | datetime | YES |
| RealizadoRespectoVenta | nvarchar | YES |
| AñoExpediente | nvarchar | YES |
| SerieExpediente | nvarchar | YES |
| NumExpediente | int | YES |
| ImporteReclamado | decimal | YES |
| ImporteAportacionConces | decimal | YES |
| ImporteAportacionAgente | decimal | YES |
| ImporteAbonadoMarca | decimal | YES |
| ImporteAbonoConces | decimal | YES |
| ImporteAbonoAgente | decimal | YES |
| FechaAsientoAbono | datetime | YES |
| IdAño | nvarchar | YES |
| IdRappels | nvarchar | YES |
| IdModulos | nvarchar | YES |
| NumDet | smallint | YES |
| FechaAbonoCampaña | datetime | YES |
| IdCompraCampañas_Abonado | smallint | YES |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FechaAbono | datetime | YES |
| IdAsientos | int | YES |
| FechaAsiento | datetime | YES |
| FechaVenta | datetime | YES |
| FechaDespacho | datetime | YES |
| FechaEntregaCliente | datetime | YES |
| IdEmpleados | smallint | YES |
| NombreEmpleado | nvarchar | YES |
| IdCampañaTipos | smallint | YES |
| VIN | nvarchar | YES |
| FechaMatriculacion | datetime | YES |
| NombreMarca | nvarchar | YES |
| IdGamas | smallint | YES |
| NombreGama | nvarchar | YES |
| CodModelo | nvarchar | YES |
| ExtModelo | nvarchar | YES |
| AñoModelo | nvarchar | YES |
| IdTercerosPropietario | int | YES |
| NombreCliente | nvarchar | YES |
| IdVentaTipos | nvarchar | YES |
| CalcularSobrePrecioBase | bit | YES |
| CalcularSobrePrecioPintura | bit | YES |
| CalcularSobrePrecioOpcionales | bit | YES |
| CalcularSobreCompra | bit | YES |
| CalcularSobrePrecioTransporte | bit | YES |
| DescuentosAplicables | nvarchar | YES |
| IdCampañaTratamientoTipos | smallint | YES |
| Observaciones | nvarchar | YES |
| IdCompraCampañasEstados | tinyint | YES |
| IdMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| IdMonedasMarca | smallint | YES |
| FactorCambioMoneda_Marca | decimal | YES |
| IdMonedasConces | smallint | YES |
| FactorCambioMoneda_Conces | decimal | YES |
| IdMonedasAgente | smallint | YES |
| FactorCambioMoneda_Agente | decimal | YES |
| DescripcionCampañas | nvarchar | YES |
| NombreModelo | nvarchar | YES |
| DescripcionCampañaTipos | nvarchar | YES |
| DescripcionventaTipos | nvarchar | YES |
| DescripcionCompraCampañasEstados | nvarchar | YES |
| NombreCentro | nvarchar | YES |
| Matricula | nvarchar | YES |
| Comision | nvarchar | YES |
| TipoFactura | nvarchar | YES |
| TerceroReclamacion | nvarchar | YES |
| FechaAltaReclamacion | datetime | YES |
| FechaEnvioDoc | datetime | YES |
| ReclamarA | nvarchar | YES |
| AfectaVenta | bit | YES |
| TipoReclamacion | nvarchar | YES |
| ObservacionesReclamacion | nvarchar | YES |
| SituacionReclamacion | nvarchar | YES |
| FechaSituacion | datetime | YES |