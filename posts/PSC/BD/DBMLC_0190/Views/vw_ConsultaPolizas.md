# View: vw_ConsultaPolizas

## Usa los objetos:
- [[Polizas_EstadoSolicitudes]]
- [[Polizas_Vehiculos_Poliza]]
- [[Polizas_Vehiculos_Solicitudes]]
- [[vw_Centros_Marca]]
- [[vw_Ultimo_Registro_EmpleadosActivos]]

```sql
CREATE VIEW [dbo].[vw_ConsultaPolizas] as
select DISTINCT p.IdPolizasSolicitudesVehiculos,p.CodigoEmpleado,p.CodigoCentro,p.NombreEmpresa,FechaCreacionSolicitud,p.IdPolizasEstadoSolicitudes,
	p.Email,p.CentroCostoSolicitante,p.Placa,p.Marca,p.Linea,p.AñoModelo,p.PrecioVehiculo, p.NumeroActivo,p.CopiaTarjetaPropiedad,
	p.CopiaFacturaCompra,p.CopiaManifiesto,p.Soat,p.CertificacionCarta0KM,p.FechaCreacionEsperaCancelada,p.FechaCreacionCancelada,p.AnoPeriodo,
	Solicitante1 = E.Nombres + ' ' + E.Apellido1+ ' ' + Apellido2, Solicitante2 = E.nombre_centro, Solicitante3 = CM.NombreCentro,
	NomEstado=ES.Descripcion,NumeroPoliza=PV.NumeroPoliza, Complemento= PV.ComplementoNumPoliza,NumeroPagos= PV.NumeroPagos, PV.ValorPrima,
	PV.NumeroOrdenCompraSpiga, PV.FechaDesde, PV.FechaHasta, PV.FechaDesdeComplemento, PV.FechaHastaComplemento, PV.FechaAutorizacionPago,
	PV.FechaPagoPoliza, PV.Año, PV.Mes, PV.IdPolizasEstados, PV.ScanearPoliza, PV.IdPolizasVehiculosPoliza
from		dbo.Polizas_Vehiculos_Solicitudes	P
LEFT JOIN	vw_Ultimo_Registro_EmpleadosActivos	E	on	p.CodigoEmpleado = E.CodigoEmpleado
LEFT JOIN   vw_Centros_Marca CM ON P.CodigoCentro = CM.CodigoCentro
LEFT JOIN   Polizas_EstadoSolicitudes ES ON P.IdPolizasEstadoSolicitudes = ES.IdPolizasEstadoSolicitudes
LEFT JOIN   Polizas_Vehiculos_Poliza PV   ON P.IdPolizasSolicitudesVehiculos = PV.IdPolizasSolicitudesVehiculos


```
