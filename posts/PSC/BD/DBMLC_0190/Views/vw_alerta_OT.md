# View: vw_alerta_OT

## Usa los objetos:
- [[Centros]]
- [[Empresas]]
- [[spiga_OrdenesDeTrabajoAbiertas]]
- [[spiga_OrdenesDeTrabajoCerradas]]

```sql













CREATE VIEW [dbo].[vw_alerta_OT]
AS

SELECT        CONSOLIDADO.IdSincronizacionSpiga, CONSOLIDADO.IdConsecutivo, CONSOLIDADO.Ano_Periodo, CONSOLIDADO.Mes_Periodo, CONSOLIDADO.FechaDeCorte, 

CONSOLIDADO.IdEmpresas, 
Empresas.NombreEmpresa, 

CASE
WHEN IdEmpresas = 1 THEN 'CT'
WHEN IdEmpresas = 2 THEN 'TA'
WHEN IdEmpresas = 3 THEN 'TS'
WHEN IdEmpresas = 4 THEN 'IR'
WHEN IdEmpresas = 5 THEN 'BN'
WHEN IdEmpresas = 6 THEN 'MM'
WHEN IdEmpresas = 9 THEN 'PM'
WHEN IdEmpresas = 22 THEN 'FM'
ELSE ''
END AS SiglaEmpresa,

CONSOLIDADO.IdCentros,
Centros.NombreCentro,
REPLACE(SUBSTRING(Centros.NombreCentro, 1, 3), '-', '') AS CentroSigla,

 
                         CONSOLIDADO.AñoOT, CONSOLIDADO.SerieOT, CONSOLIDADO.NumOT, CONSOLIDADO.NumTrabajo, 
						 
						 CAST(SerieOT AS VARCHAR(10)) + '/' + CAST(NumOT AS VARCHAR(10)) + '/' + CAST(AñoOT AS VARCHAR(10)) + '-' + CAST(NumTrabajo AS VARCHAR(10)) AS OT,
						 
						 
						 CONSOLIDADO.IdCargoTipos, CONSOLIDADO.FechaPrevistaEntrega, CONSOLIDADO.IdRecepcionTipos, 
                         CONSOLIDADO.FechaEntrada, CONSOLIDADO.IdUbicaciones, CONSOLIDADO.IdDepartamentoCargoInterno, CONSOLIDADO.IdMarcas, CONSOLIDADO.IdSecciones, CONSOLIDADO.DescripcionSeccion, 
                         CONSOLIDADO.IdSeccionCargo, CONSOLIDADO.DescripcionSeccionCargo, CONSOLIDADO.IdEmpleadoAlta, CONSOLIDADO.IdManoObraTipos, CONSOLIDADO.IdGamas, CONSOLIDADO.CodModelo, CONSOLIDADO.AñoModelo, 
                         CONSOLIDADO.ExtModelo, CONSOLIDADO.NombreTerceroCargo, CONSOLIDADO.IdTerceroCargo, CONSOLIDADO.Matricula, CONSOLIDADO.VIN, CONSOLIDADO.DiasAbiertos, CONSOLIDADO.FechaAlta, 
                         CONSOLIDADO.FechaCierre, CONSOLIDADO.NombreTercero, CONSOLIDADO.NombreMarcas, CONSOLIDADO.NombreGamas, CONSOLIDADO.NombreModelos, CONSOLIDADO.ImporteMO, CONSOLIDADO.ImporteMOChapa, 
                         CONSOLIDADO.ImporteMOPintura, CONSOLIDADO.ImporteMOMecanica, CONSOLIDADO.HorasMO, CONSOLIDADO.HorasMOChapa, CONSOLIDADO.HorasMOPintura, CONSOLIDADO.HorasMOMecanica, CONSOLIDADO.costeMO, 
                         CONSOLIDADO.HorasEmpleadas, CONSOLIDADO.HorasEmpleadasChapa, CONSOLIDADO.HorasEmpleadasPintura, CONSOLIDADO.HorasEmpleadasMecanica, CONSOLIDADO.PrecioCoste, CONSOLIDADO.PrecioCosteChapa, 
                         CONSOLIDADO.PrecioCostePintura, CONSOLIDADO.PrecioCosteMecanica, CONSOLIDADO.ImporteMateriales, CONSOLIDADO.PrecioMedio, CONSOLIDADO.ImportePinturas, CONSOLIDADO.CostePinturas, 
                         CONSOLIDADO.ImporteVarios, CONSOLIDADO.ImporteSubContratado, CONSOLIDADO.CosteSubContratado, CONSOLIDADO.IdEmpleadosRec, CONSOLIDADO.NombreEmpleadoRec, CONSOLIDADO.Apellido1EmpleadoRec, 
                         CONSOLIDADO.Apellido2EmpleadoRec, CONSOLIDADO.IdEmpleadosResponsable, CONSOLIDADO.NombreEmpleadoResponsable, CONSOLIDADO.Apellido1EmpleadoResponsable, 
                         CONSOLIDADO.Apellido2EmpleadoResponsable, CONSOLIDADO.ImporteEntradasTrabajosExternos, CONSOLIDADO.CosteEntradasTrabajosExternos, CONSOLIDADO.IdServicioTipos, CONSOLIDADO.IdGradosAveria, 
                         CONSOLIDADO.NumSiniestro, CONSOLIDADO.NumeroAutorizacion, CONSOLIDADO.ObservacionesOT, CONSOLIDADO.FechaAltaOT, CONSOLIDADO.NombreEmpleadoCierre, CONSOLIDADO.Apellido1EmpleadoCierre, 
                         CONSOLIDADO.Apellido2EmpleadoCierre, CONSOLIDADO.FechaFacturacion, 
						 
						 
						 CONSOLIDADO.IdTrabajoEstado, 
						 
						 CASE
						 WHEN IdTrabajoEstado = 'A' THEN 'Abierta'
						 WHEN IdTrabajoEstado = 'T' THEN 'Terminada'
						 WHEN IdTrabajoEstado = 'C' THEN 'Cerrada'
						 WHEN IdTrabajoEstado = 'F' THEN 'Facturada'
						 ELSE IdTrabajoEstado
						 END AS EstadoActual,
						 
						 
						 CONSOLIDADO.IdGradoAveriaTrabajo, CONSOLIDADO.IdGradoAveriaOrdenTrabajo, 
                         CONSOLIDADO.FechaDiagnostico, CONSOLIDADO.TipoOT,  
						 


						 99 AS IDCargo, 
						 DescripcionSeccionCargo AS Cargo, 
						 
						 CASE 
						 
						 WHEN IdCargoTipos = 'G' THEN 1
						 WHEN IdCargoTipos = 'GA' THEN 2
						 WHEN IdCargoTipos = 'I' THEN 3
						 WHEN IdCargoTipos = 'S' THEN 4
						 WHEN IdCargoTipos = 'C' THEN 5
						 ELSE 0 
						 END AS IDCargoTipo, 
                         
						 CASE 
						
						 WHEN IdCargoTipos = 'G' THEN 'GARANTIA'
						 WHEN IdCargoTipos = 'GA' THEN 'GARANTIA AMPLIADA'
						 WHEN IdCargoTipos = 'I' THEN 'INTERNO'
						 WHEN IdCargoTipos = 'S' THEN 'ASEGURADORAS'
						 WHEN IdCargoTipos = 'C' THEN 'CLIENTES'
						 ELSE 'SIN TIPO' 
						 END AS CargoTipo,

						 (datediff(day,[FechaEntrada],[FechaDeCorte])) AS DiasAbierto,

						 CASE 
						 WHEN (datediff(day,[FechaEntrada],[FechaDeCorte])) <= 30 THEN 0 
						 WHEN (datediff(day,[FechaEntrada],[FechaDeCorte])) > 30 AND (datediff(day,[FechaEntrada],[FechaDeCorte])) <= 60 THEN 1 
						 WHEN (datediff(day,[FechaEntrada],[FechaDeCorte])) > 60 AND (datediff(day,[FechaEntrada],[FechaDeCorte])) <= 90 THEN 2 
						 WHEN (datediff(day,[FechaEntrada],[FechaDeCorte])) > 90 AND (datediff(day,[FechaEntrada],[FechaDeCorte])) <= 120 THEN 3 
						 WHEN (datediff(day,[FechaEntrada],[FechaDeCorte])) > 120 THEN 4
						 ELSE 5 END AS DiasRango,


						 CASE 
						 WHEN (datediff(day,[FechaEntrada],[FechaDeCorte])) > 90 THEN 90
						 WHEN (datediff(day,[FechaEntrada],[FechaDeCorte])) > 60 THEN 60 
						 WHEN (datediff(day,[FechaEntrada],[FechaDeCorte])) > 30 THEN 30
						 ELSE 0 END AS DiasAlerta,

						 ISNULL(ImporteMO, 0) + ISNULL(ImporteMOChapa, 0) + ISNULL(ImporteMOPintura, 0) + 
						 ISNULL(ImporteMateriales, 0) + ISNULL(ImportePinturas, 0) + ISNULL(ImporteVarios, 0) + 
						 ISNULL(ImporteSubContratado, 0) + ISNULL(ImporteEntradasTrabajosExternos, 0) 
						 AS ValorTotal

						 





FROM            dbo.Empresas RIGHT OUTER JOIN
                             (SELECT        IdSincronizacionSpiga, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, IdCentros, AñoOT, SerieOT, NumOT, NumTrabajo, IdCargoTipos, FechaPrevistaEntrega, IdRecepcionTipos, 
                                                         FechaEntrada, IdUbicaciones, IdDepartamentoCargoInterno, IdMarcas, IdSecciones, DescripcionSeccion, IdSeccionCargo, DescripcionSeccionCargo, IdEmpleadoAlta, IdManoObraTipos, IdGamas, CodModelo, 
                                                         AñoModelo, ExtModelo, NombreTerceroCargo, IdTerceroCargo, Matricula, VIN, DiasAbiertos, FechaAlta, FechaCierre, NombreTercero, NombreMarcas, NombreGamas, NombreModelos, ImporteMO, 
                                                         ImporteMOChapa, ImporteMOPintura, ImporteMOMecanica, HorasMO, HorasMOChapa, HorasMOPintura, HorasMOMecanica, costeMO, HorasEmpleadas, HorasEmpleadasChapa, HorasEmpleadasPintura, 
                                                         HorasEmpleadasMecanica, PrecioCoste, PrecioCosteChapa, PrecioCostePintura, PrecioCosteMecanica, ImporteMateriales, PrecioMedio, ImportePinturas, CostePinturas, ImporteVarios, ImporteSubContratado, 
                                                         CosteSubContratado, IdEmpleadosRec, NombreEmpleadoRec, Apellido1EmpleadoRec, Apellido2EmpleadoRec, IdEmpleadosResponsable, NombreEmpleadoResponsable, Apellido1EmpleadoResponsable, 
                                                         Apellido2EmpleadoResponsable, ImporteEntradasTrabajosExternos, CosteEntradasTrabajosExternos, IdServicioTipos, IdGradosAveria, NumSiniestro, NumeroAutorizacion, ObservacionesOT, FechaAltaOT, 
                                                         NombreEmpleadoCierre, Apellido1EmpleadoCierre, Apellido2EmpleadoCierre, FechaFacturacion, IdTrabajoEstado, IdGradoAveriaTrabajo, IdGradoAveriaOrdenTrabajo, FechaDiagnostico, 
                                                         'ABIERTA' AS TipoOT
                               FROM            [PSCService_DB].dbo.spiga_OrdenesDeTrabajoAbiertas
                               UNION ALL
                               SELECT        IdSincronizacionSpiga, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, IdCentros, AñoOT, SerieOT, NumOT, NumTrabajo, IdCargoTipos, FechaPrevistaEntrega, IdRecepcionTipos, 
                                                        FechaEntrada, IdUbicaciones, IdDepartamentoCargoInterno, IdMarcas, IdSecciones, DescripcionSeccion, IdSeccionCargo, DescripcionSeccionCargo, IdEmpleadoAlta, IdManoObraTipos, IdGamas, CodModelo, 
                                                        AñoModelo, ExtModelo, NombreTerceroCargo, IdTerceroCargo, Matricula, VIN, DiasAbiertos, FechaAlta, FechaCierre, NombreTercero, NombreMarcas, NombreGamas, NombreModelos, ImporteMO, 
                                                        ImporteMOChapa, ImporteMOPintura, ImporteMOMecanica, HorasMO, HorasMOChapa, HorasMOPintura, HorasMOMecanica, costeMO, HorasEmpleadas, HorasEmpleadasChapa, HorasEmpleadasPintura, 
                                                        HorasEmpleadasMecanica, PrecioCoste, PrecioCosteChapa, PrecioCostePintura, PrecioCosteMecanica, ImporteMateriales, PrecioMedio, ImportePinturas, CostePinturas, ImporteVarios, ImporteSubContratado, 
                                                        CosteSubContratado, IdEmpleadosRec, NombreEmpleadoRec, Apellido1EmpleadoRec, Apellido2EmpleadoRec, IdEmpleadosResponsable, NombreEmpleadoResponsable, Apellido1EmpleadoResponsable, 
                                                        Apellido2EmpleadoResponsable, ImporteEntradasTrabajosExternos, CosteEntradasTrabajosExternos, IdServicioTipos, IdGradosAveria, NumSiniestro, NumeroAutorizacion, ObservacionesOT, FechaAltaOT, 
                                                        NombreEmpleadoCierre, Apellido1EmpleadoCierre, Apellido2EmpleadoCierre, FechaFacturacion, IdTrabajoEstado, IdGradoAveriaTrabajo, IdGradoAveriaOrdenTrabajo, FechaDiagnostico, 
                                                        'CERRADA' AS TipoOT
                               FROM            [PSCService_DB].dbo.spiga_OrdenesDeTrabajoCerradas) AS CONSOLIDADO LEFT OUTER JOIN
                         dbo.Centros ON CONSOLIDADO.IdCentros = dbo.Centros.CodigoCentro ON dbo.Empresas.CodigoEmpresa = CONSOLIDADO.IdEmpresas

```
