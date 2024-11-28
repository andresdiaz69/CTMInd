# View: vw_ComisionesSpigaInformeRepuestosTallerPorOT

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]

```sql
CREATE VIEW [dbo].[vw_ComisionesSpigaInformeRepuestosTallerPorOT]
AS
SELECT        Id, IdComisionSpiga, Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, CodigoEmpresa, Empresa, CodigoCentro, Centro, CodigoSeccion, Seccion, NumOT, NumeroFacturaTaller, NumeroAlbaran, FechaAperturaOrden, 
                         FechaFactura, fechaentrega, Placa, VIN, FkServicioTipos, Marcaveh, NombreMarca, Gama, NombreGama, NitCliente, NombreCliente, CodigoCategoriaCliente, CategoriaCliente, TipoCargo, TipoIntCargo, marca, Codigo, 
                         descripcion, TipoOperacion, ValorUnitario, UnidadesVendidas, PorcentajeDescuento, ImporteImpuesto, CedulaOperario, NombreOperario, CedulaAsesorServicioAlta, AsesorServicioAlta, CedulaAsesorServicioResponsable, 
                         AsesorServicioResponsable, CedulaAsesorServicioCierre, AsesorServicioCierre, CedulaAsesorServicioRetirada, AsesorServicioRetirada, TrabajoRetorno, Cotizacion, CampañaRepuesto, CodClas1, DescripClas1, CodClas2, 
                         DescripClas2, CodClas3, DescripClas3, CodClas4, DescripClas4, CodClas5, DescripClas5, CodClas6, DescripClas6, CedulaVendedorRepuestos, NombreVendedorRepuestos, CedulaBodeguero, NombreBodeguero, ValorNeto, 
                         
						 CASE 
						 WHEN TipoIntCargo = 'C' THEN 'Cliente' 
						 WHEN TipoIntCargo = 'G' THEN 'Garantia' 
						 WHEN TipoIntCargo = 'I' THEN 'Interna' 
						 WHEN TipoIntCargo = 'S' THEN 'Aseguradora' 
						 END AS TipoVenta

FROM            dbo.ComisionesSpigaTallerPorOT
WHERE        (TipoOperacion = 'MAT')



```
