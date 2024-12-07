# Table: Prestamos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkVehiculos | int | NO |
| PkPrestamos_Iden | int | NO |
| FechaInicioReserva | datetime | YES |
| FechaFinReserva | datetime | YES |
| FechaEntrega | datetime | YES |
| FechaDevolucion | datetime | YES |
| KmsEntrega | int | YES |
| KmsDevolucion | int | YES |
| FkTerceros | int | NO |
| FkVehiculoTiposUso | nvarchar | NO |
| FkPrestamoTipos | smallint | NO |
| ObservacionesEntrega | nvarchar | YES |
| FechaAlta | datetime | NO |
| FkEmpleados_Entrega | smallint | YES |
| FkEmpleados_Devolucion | smallint | YES |
| Importe | decimal | YES |
| FkNumOT | int | YES |
| FkSeries_OT | nvarchar | YES |
| FkAñoOT | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaPrevistaDevolucion | datetime | YES |
| FkCitas | int | YES |
| FkActividad | smallint | YES |
| ExpedienteCS | nvarchar | YES |
| NumAutorizacion | nvarchar | YES |
| FkPrestamoPagadores | nvarchar | YES |
| FechaMod | datetime | NO |
| ObservacionesDañosEntrega | nvarchar | YES |
| IncrementoDiaPosReparacion | decimal | YES |
| SerieContrato | nvarchar | YES |
| NumContrato | int | YES |
| AñoContrato | nvarchar | YES |
| FkCentros_OT | smallint | YES |
| FkNumTrabajo | tinyint | YES |
| FkEmpleados_Reserva | smallint | YES |
| FkTerceros_ConductorPrincipal | int | YES |
| FkTerceros_SegundoConductor | int | YES |
| LimiteKms | int | YES |
| LimiteHoras | int | YES |
| FkCantidadCombustible | nvarchar | YES |
| BonoReferencia | nvarchar | YES |
| FkSeguroTipos | nvarchar | YES |
| ImporteSeguro | decimal | YES |
| ImporteFranquiciaSeguro | decimal | YES |
| HorasEntrega | int | YES |
| FkCantidadCombustible_Entrega | nvarchar | YES |
| LucesAveriaEntrega | bit | YES |
| EstadoInterioresEntrega | nvarchar | YES |
| NoHayDañosEntrega | bit | YES |
| ImprimirDañosEntrega | bit | YES |
| ExtrasObservacionesEntrega | nvarchar | YES |
| ObservacionesDevolucion | nvarchar | YES |
| HorasDevolucion | int | YES |
| FkCantidadCombustible_Devolucion | nvarchar | YES |
| LucesAveriaDevolucion | bit | YES |
| EstadoInterioresDevolucion | nvarchar | YES |
| NoHayDañosDevolucion | bit | YES |
| ImprimirDañosDevolucion | bit | YES |
| ObservacionesDañosDevolucion | nvarchar | YES |
| ExtrasObservacionesDevolucion | nvarchar | YES |
| FkAlquilerFacturacionPeriodos | tinyint | YES |
| DiasFacturacion | smallint | YES |
| FkAlquilerTarifas | smallint | YES |
| FkPagoFormas | nvarchar | YES |
| ImporteTotal | decimal | YES |
| FkCentros_Imputacion | smallint | YES |
| FkDepartamentos_Imputacion | nvarchar | YES |
| FkSecciones_Imputacion | int | YES |
| FkTercerosCargo | int | YES |
| FechaDesdeProximaFactura | datetime | YES |
| FechaHastaProximaFactura | datetime | YES |
| PeriodosFacturados | smallint | YES |
| ImportePteAmortizar | decimal | YES |
| FkAlquilerPeriodos | tinyint | YES |
| FkTerceroDireccionesCargo | smallint | YES |
| FkTerceros_AlquilerOfertas | int | YES |
| FkAlquilerOfertas | smallint | YES |
| FechaBaja | datetime | YES |
| FkEntidades | nvarchar | YES |
| SuReferencia | nvarchar | YES |
| FechaReferencia | datetime | YES |
| ConceptoReferencia | nvarchar | YES |
| LugarEntrega | nvarchar | YES |
| LugarDevolucion | nvarchar | YES |
| FkTextoTipo | nvarchar | YES |
| FkUbicacionEntrega | nvarchar | YES |
| FkUbicacionDevolucion | nvarchar | YES |
| FkVehiculosUbicacionesPrestamo | int | YES |
| FkVehiculosUbicacionesDevolucion | int | YES |
| VolcadoEstadoVehiculo_Entrega | bit | NO |
| VolcadoEstadoVehiculo_Devolucion | bit | NO |
| IdTerceros_Aseguradora | int | YES |
| FkCentros_ImputacionOrigen | smallint | YES |
| FkDepartamentos_ImputacionOrigen | nvarchar | YES |
| FkSecciones_ImputacionOrigen | int | YES |
| ImporteCosteTotal | decimal | YES |
| CodigoSuscripcionProgramada | nvarchar | YES |
| CodigoSuscripcionActiva | nvarchar | YES |
| MesesTarifa | smallint | YES |
