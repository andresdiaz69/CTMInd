# View: vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[Empleados]]

```sql
CREATE VIEW [dbo].[vw_ComercialVNPorAcc_ComisionesSpigaTallerPorOT]
AS
SELECT        ComisionesSpigaTallerPorOT.Id, ComisionesSpigaTallerPorOT.IdComisionSpiga, ComisionesSpigaTallerPorOT.Ano_Periodo, ComisionesSpigaTallerPorOT.Mes_Periodo, ComisionesSpigaTallerPorOT.Ano_Spiga, 
                         ComisionesSpigaTallerPorOT.Mes_Spiga, 
						 
						 -- JCS: 03/05/2023 
						 -- SI EL VENDEDOR DE REPUESTOS ES DE CT O MM, Y VENDIO ALGO POR BN, SE LE DEBE PAGAR POR SU EMPRESA
						 -- APLICA SÓLO PARA EL ESQUEMA DE ACCESORIOS DE VENDEDORES VN

						 CASE 
						 WHEN Empleados.CodigoEmpresa = 1 AND dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa = 5 THEN 1
						 WHEN Empleados.CodigoEmpresa = 6 AND dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa = 5 THEN 6
						 ELSE ComisionesSpigaTallerPorOT.CodigoEmpresa
						 END AS CodigoEmpresa,

						 CASE 
						 WHEN Empleados.CodigoEmpresa = 1 AND dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa = 5 THEN 'CasaToro'
						 WHEN Empleados.CodigoEmpresa = 6 AND dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa = 5 THEN 'Motores y Máquinas'
						 ELSE ComisionesSpigaTallerPorOT.Empresa
						 END AS Empresa,
						 
						 ComisionesSpigaTallerPorOT.CodigoCentro, ComisionesSpigaTallerPorOT.Centro, 
                         ComisionesSpigaTallerPorOT.CodigoSeccion, ComisionesSpigaTallerPorOT.Seccion, ComisionesSpigaTallerPorOT.NumOT, ComisionesSpigaTallerPorOT.NumeroFacturaTaller, ComisionesSpigaTallerPorOT.NumeroAlbaran, 
                         ComisionesSpigaTallerPorOT.FechaAperturaOrden, ComisionesSpigaTallerPorOT.FechaFactura, ComisionesSpigaTallerPorOT.fechaentrega, ComisionesSpigaTallerPorOT.Placa, ComisionesSpigaTallerPorOT.VIN, 
                         ComisionesSpigaTallerPorOT.FkServicioTipos, ComisionesSpigaTallerPorOT.Marcaveh, ComisionesSpigaTallerPorOT.NombreMarca, ComisionesSpigaTallerPorOT.Gama, ComisionesSpigaTallerPorOT.NombreGama, 
                         ComisionesSpigaTallerPorOT.NitCliente, ComisionesSpigaTallerPorOT.NombreCliente, ComisionesSpigaTallerPorOT.CodigoCategoriaCliente, ComisionesSpigaTallerPorOT.CategoriaCliente, 
                         ComisionesSpigaTallerPorOT.TipoCargo, ComisionesSpigaTallerPorOT.TipoIntCargo, ComisionesSpigaTallerPorOT.marca, ComisionesSpigaTallerPorOT.Codigo, ComisionesSpigaTallerPorOT.descripcion, 
                         ComisionesSpigaTallerPorOT.TipoOperacion, ComisionesSpigaTallerPorOT.ValorUnitario, ComisionesSpigaTallerPorOT.UnidadesVendidas, ComisionesSpigaTallerPorOT.PorcentajeDescuento, 
                         ComisionesSpigaTallerPorOT.ImporteImpuesto, ComisionesSpigaTallerPorOT.CedulaOperario, ComisionesSpigaTallerPorOT.NombreOperario, ComisionesSpigaTallerPorOT.CedulaAsesorServicioAlta, 
                         ComisionesSpigaTallerPorOT.AsesorServicioAlta, ComisionesSpigaTallerPorOT.CedulaAsesorServicioResponsable, ComisionesSpigaTallerPorOT.AsesorServicioResponsable, 
                         ComisionesSpigaTallerPorOT.CedulaAsesorServicioCierre, ComisionesSpigaTallerPorOT.AsesorServicioCierre, ComisionesSpigaTallerPorOT.CedulaAsesorServicioRetirada, 
                         ComisionesSpigaTallerPorOT.AsesorServicioRetirada, ComisionesSpigaTallerPorOT.TrabajoRetorno, ComisionesSpigaTallerPorOT.Cotizacion, ComisionesSpigaTallerPorOT.CampañaRepuesto, 
                         ComisionesSpigaTallerPorOT.CodClas1, ComisionesSpigaTallerPorOT.DescripClas1, ComisionesSpigaTallerPorOT.CodClas2, ComisionesSpigaTallerPorOT.DescripClas2, ComisionesSpigaTallerPorOT.CodClas3, 
                         ComisionesSpigaTallerPorOT.DescripClas3, ComisionesSpigaTallerPorOT.CodClas4, ComisionesSpigaTallerPorOT.DescripClas4, ComisionesSpigaTallerPorOT.CodClas5, ComisionesSpigaTallerPorOT.DescripClas5, 
                         ComisionesSpigaTallerPorOT.CodClas6, ComisionesSpigaTallerPorOT.DescripClas6, ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos, ComisionesSpigaTallerPorOT.NombreVendedorRepuestos, 
                         ComisionesSpigaTallerPorOT.CedulaBodeguero, ComisionesSpigaTallerPorOT.NombreBodeguero, ComisionesSpigaTallerPorOT.ValorNeto, ComisionesSpigaTallerPorOT.Coste, ComisionesSpigaTallerPorOT.IdImputaciontipos, 
                         ComisionesSpigaTallerPorOT.TipoImputacion, ComisionesSpigaTallerPorOT.DescripcionTrabajo
FROM            ComisionesSpigaTallerPorOT LEFT OUTER JOIN
                         Empleados ON ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos = Empleados.CodigoEmpleado

```
