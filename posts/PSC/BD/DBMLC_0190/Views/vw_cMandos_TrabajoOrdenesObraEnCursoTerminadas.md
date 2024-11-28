# View: vw_cMandos_TrabajoOrdenesObraEnCursoTerminadas

## Usa los objetos:
- [[SpigaTrabajoOrdenesObraEnCursoTerminadas]]

```sql








CREATE VIEW [dbo].[vw_cMandos_TrabajoOrdenesObraEnCursoTerminadas]
AS
SELECT        IdSincronizacionSpiga, IdConsecutivo, Ano_Periodo, Mes_Periodo, IdEmpresas CodigoEmpresa, 
				case when IdCentros=28 then (idCentros*1000)+IdSecciones else idCentros end CodigoCentro, 
				AñoOT, SerieOT, NumOT, NumTrabajo, IdCargoTipos, FechaPrevistaEntrega, IdRecepcionTipos, FechaEntrada, IdUbicaciones, 
				IdDepartamentoCargoInterno, IdMarcas, IdSecciones CodigoSeccion, DescripcionSeccion, IdSeccionCargo, DescripcionSeccionCargo, IdEmpleadoAlta, IdManoObraTipos, IdGamas, CodModelo, AñoModelo, ExtModelo, NombreTerceroCargo, 
				IdTerceroCargo, Matricula, VIN, DiasAbiertos, FechaAlta, FechaCierre, NombreTercero, NombreMarcas, NombreGamas, NombreModelos, ImporteMO, ImporteMOChapa, ImporteMOPintura, ImporteMOMecanica, HorasMO, 
				HorasMOChapa, HorasMOPintura, HorasMOMecanica, costeMO, HorasEmpleadas, HorasEmpleadasChapa, HorasEmpleadasPintura, HorasEmpleadasMecanica, PrecioCoste, PrecioCosteChapa, PrecioCostePintura, 
				PrecioCosteMecanica, ImporteMateriales, PrecioMedio, ImportePinturas, CostePinturas, ImporteVarios, ImporteSubContratado, CosteSubContratado, IdEmpleadosRec, NombreEmpleadoRec, Apellido1EmpleadoRec, 
				Apellido2EmpleadoRec, IdEmpleadosResponsable, NombreEmpleadoResponsable, Apellido1EmpleadoResponsable, Apellido2EmpleadoResponsable, ImporteEntradasTrabajosExternos, CosteEntradasTrabajosExternos, 
				IdServicioTipos, IdGradosAveria, NumSiniestro, NumeroAutorizacion, ObservacionesOT, FechaAltaOT, NombreEmpleadoCierre, Apellido1EmpleadoCierre, Apellido2EmpleadoCierre, FechaFacturacion, IdTrabajoEstado, 
				IdGradoAveriaTrabajo, IdGradoAveriaOrdenTrabajo, FechaDiagnostico
FROM            SpigaTrabajoOrdenesObraEnCursoTerminadas

```
