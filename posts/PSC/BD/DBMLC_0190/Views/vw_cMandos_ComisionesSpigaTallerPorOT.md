# View: vw_cMandos_ComisionesSpigaTallerPorOT

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[UnidadDeNegocio]]

```sql










CREATE VIEW [dbo].[vw_cMandos_ComisionesSpigaTallerPorOT]
AS
	SELECT  a.*,ltrim(rtrim(b.CodDepartamento)) CodDepartamento
	FROM (
		Select 
		Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, CodigoEmpresa, Empresa, 
		case 
			when CodigoEmpresa = 1 and CodigoCentro = 1 and CodigoSeccion = 616 then 51
			when CodigoEmpresa = 1 and CodigoCentro = 1 and CodigoSeccion = 615 then 51
			when CodigoEmpresa = 1 and CodigoCentro = 66 and CodigoSeccion = 609 then 68
			when CodigoEmpresa = 1 and CodigoCentro = 28 then 28000+CodigoSeccion
			when CodigoEmpresa = 6 and CodigoCentro = 28 then 28000+CodigoSeccion
			else Codigocentro 
		end CodigoCentro,
		Centro, CodigoSeccion, Seccion, NumOT, NumeroFacturaTaller, NumeroAlbaran, FechaAperturaOrden, 
		FechaFactura, fechaentrega, Placa, VIN, FkServicioTipos, Marcaveh, NombreMarca, Gama, NombreGama, NitCliente, NombreCliente, CodigoCategoriaCliente, CategoriaCliente, TipoCargo, TipoIntCargo, marca, Codigo, 
		descripcion, TipoOperacion, ValorUnitario, UnidadesVendidas, PorcentajeDescuento, ImporteImpuesto, CedulaOperario, NombreOperario, CedulaAsesorServicioAlta, AsesorServicioAlta, CedulaAsesorServicioResponsable, 
		AsesorServicioResponsable, CedulaAsesorServicioCierre, AsesorServicioCierre, CedulaAsesorServicioRetirada, AsesorServicioRetirada, TrabajoRetorno, Cotizacion, CampañaRepuesto, CodClas1, DescripClas1, CodClas2, 
		DescripClas2, CodClas3, DescripClas3, CodClas4, DescripClas4, CodClas5, DescripClas5, CodClas6, DescripClas6, CedulaVendedorRepuestos, NombreVendedorRepuestos, CedulaBodeguero, NombreBodeguero, ValorNeto, 
		Coste, IdImputaciontipos, TipoImputacion, DescripcionTrabajo
		from ComisionesSpigaTallerPorOT
	) a
	left join UnidadDeNegocio b on a.CodigoEmpresa = b.CodEmpresa and a.CodigoCentro = b.CodCentro and a.CodigoSeccion = b.CodSeccion

```
