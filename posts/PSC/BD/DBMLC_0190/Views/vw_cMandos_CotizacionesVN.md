# View: vw_cMandos_CotizacionesVN

## Usa los objetos:
- [[spiga_CotizacionesVN]]

```sql




CREATE VIEW [dbo].[vw_cMandos_CotizacionesVN]
AS

	SELECT Ano_Periodo, Mes_Periodo, FechaDeCorte, FkOfertasEstados, IdEmpresas CodigoEmpresa,
		case when IdCentros=28 then (idCentros*1000)+IdSecciones else idCentros end CodigoCentro, 
		IdOfertas, IdTerceros, IdClientesPotEntradas, IdModulos, TotalOferta, NombreMarca, NombreGama, 
		FechaContrato, NumContrato, IdVentaTipos, FechaPrevista, NumPedidoVNReserva, ObservacionesInternas, ObservacionesExternas, IdMonedas, 
		FactorCambioMoneda, FechaAlta, AñoOferta, SerieOferta, NumOferta, IdCentrosPedido, IdVentaMarcaTipos, DiasEntregaFabrica, VIN, Matricula, 
		Nombre, IdMarcas, IdGamas, CodModelo, ExtModelo, AñoModelo, IdVersiones, IdTarifas, CodExternoModelo, NombreCentro, FechaBajaCliente, 
		TelefonoMovil, Email, FechaAutorizacion, FechaAceptacion, FechaVenta, NombreVendedorAsignado, ImporteSaldado, IdPlantillaCalculo, 
		DescripcionPlantilla, ImporteVOACambio, NifCifClientePot, Importe, Porcentaje, NombreVendedor, PkOpcionales, IdIMSConcesionarios, 
		IdIMSCuentas, IdIMSSucursales, IdIMSVendedores, NombreIMSVendedor, IdSecciones, FechaSalida, VOsEntregados, IdVehiculos, CodClientePot, 
		Descripcion, NombreModelo, NombreVersion, DescripcionOfertasEstados, DescripcionSecciones, EstadoFinanciacion, IntencionesCompraDescripcion, 
		ClientePotClasificacionDescripcion, DescripcionProcedencia, DescripcionSalidaTipos,1 cantidad
	FROM            PSCService_DB.dbo.spiga_CotizacionesVN


```
