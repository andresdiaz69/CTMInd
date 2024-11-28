# View: vw_cMandos_CotizacionesVO

## Usa los objetos:
- [[spiga_CotizacionesVO]]

```sql

CREATE VIEW [dbo].[vw_cMandos_CotizacionesVO]
AS
SELECT	Ano_Periodo, Mes_Periodo, FechaDeCorte, IdVehiculos, FkOfertasEstados, IdEmpresas CodigoEmpresa, 
		case when IdCentros=28 then (idCentros*1000)+IdSecciones else idCentros end CodigoCentro, 
		IdOfertas, IdTerceros, IdClientesPotEntradas, IdMonedas, FactorCambioMoneda, AñoOferta, SerieOferta, NumOferta, IdModulos,
		TotalOferta, IdMarcas, IdGamas, CodModelo, ExtModelo, AñoModelo, IdVersiones, NombreMarca, NombreGama, SerieExpedienteReserva, NumExpedienteReserva, AñoExpedienteReserva, IdCentrosExpedienteReserva, 
		FechaReserva, IdOfertasEstados, VIN, Matricula, Nombre, NombreCentro, FechaAutorizacion, FechaAceptacion, NombreVendedorAsignado, ImporteSaldado, NifCifClientePot, IdPlantillaCalculo, DescripcionPlantilla, 
		ImporteVOACambio, CodClientePot, TelefonoMovil, Email, Importe, Porcentaje, NombreVendedor, IdOpcionalesColorVO, IdOpcionalesTapizadoVO, NombreEmpresa, TerceroInteresado, IdSecciones, DescripcionSecciones, 
		FechaAlta, IdOpcionales, DescripcionProcedencia, FechaSalida, VOsEntregados, NombreModelo, NombreVersion, Descripcion, DescripcionColorVO, DescripcionTapizadoVO, DescripcionOfertaEstados, 
		IntencionesCompraDescripcion, ClientePotClasificacionDescripcion, DescripcionSalidaTipos, 1 Cantidad
FROM	PSCService_DB.dbo.spiga_CotizacionesVO

```
