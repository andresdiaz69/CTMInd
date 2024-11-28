# View: vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[vw_EmpleadosRangosMaestras]]

```sql







CREATE VIEW [dbo].[vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCT]
AS
SELECT        Id, IdComisionSpiga, Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, CodigoEmpresa, Empresa, CodigoCentro, Centro, CodigoSeccion, Seccion, NumOT, NumeroFacturaTaller, NumeroAlbaran, 
                         FechaAperturaOrden, FechaFactura, fechaentrega, Placa, VIN, FkServicioTipos, Marcaveh, NombreMarca, Gama, NombreGama, NitCliente, NombreCliente, CodigoCategoriaCliente, CategoriaCliente, TipoCargo, 
                         TipoIntCargo, marca, Codigo, descripcion, TipoOperacion, ValorUnitario, UnidadesVendidas, PorcentajeDescuento, ImporteImpuesto, CedulaOperario, NombreOperario, CedulaAsesorServicioAlta, 
                         AsesorServicioAlta, CedulaAsesorServicioResponsable, AsesorServicioResponsable, CedulaAsesorServicioCierre, AsesorServicioCierre, CedulaAsesorServicioRetirada, AsesorServicioRetirada, TrabajoRetorno, 
                         Cotizacion, CampañaRepuesto, CodClas1, DescripClas1, CodClas2, DescripClas2, CodClas3, DescripClas3, CodClas4, DescripClas4, CodClas5, DescripClas5, CodClas6, DescripClas6, 
                         CedulaVendedorRepuestos_Pre, NombreVendedorRepuestos_Pre, CASE WHEN CodigoEmpleado IS NULL THEN [CedulaVendedorRepuestos_Pre] ELSE [CedulaBodeguero] END AS CedulaVendedorRepuestos, 
                         CASE WHEN CodigoEmpleado IS NULL THEN [NombreVendedorRepuestos_Pre] ELSE [NombreBodeguero] END AS NombreVendedorRepuestos, CedulaBodeguero, NombreBodeguero, CodigoEmpleado, 
                         Empleado
FROM            (SELECT        dbo.ComisionesSpigaTallerPorOT.Id, dbo.ComisionesSpigaTallerPorOT.IdComisionSpiga, dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, 
                                                    dbo.ComisionesSpigaTallerPorOT.Ano_Spiga, dbo.ComisionesSpigaTallerPorOT.Mes_Spiga, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.Empresa, 
                                                    dbo.ComisionesSpigaTallerPorOT.CodigoCentro, dbo.ComisionesSpigaTallerPorOT.Centro, dbo.ComisionesSpigaTallerPorOT.CodigoSeccion, dbo.ComisionesSpigaTallerPorOT.Seccion, 
                                                    dbo.ComisionesSpigaTallerPorOT.NumOT, dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller, dbo.ComisionesSpigaTallerPorOT.NumeroAlbaran, 
                                                    dbo.ComisionesSpigaTallerPorOT.FechaAperturaOrden, dbo.ComisionesSpigaTallerPorOT.FechaFactura, dbo.ComisionesSpigaTallerPorOT.fechaentrega, dbo.ComisionesSpigaTallerPorOT.Placa, 
                                                    dbo.ComisionesSpigaTallerPorOT.VIN, dbo.ComisionesSpigaTallerPorOT.FkServicioTipos, dbo.ComisionesSpigaTallerPorOT.Marcaveh, dbo.ComisionesSpigaTallerPorOT.NombreMarca, 
                                                    dbo.ComisionesSpigaTallerPorOT.Gama, dbo.ComisionesSpigaTallerPorOT.NombreGama, dbo.ComisionesSpigaTallerPorOT.NitCliente, dbo.ComisionesSpigaTallerPorOT.NombreCliente, 
                                                    dbo.ComisionesSpigaTallerPorOT.CodigoCategoriaCliente, dbo.ComisionesSpigaTallerPorOT.CategoriaCliente, dbo.ComisionesSpigaTallerPorOT.TipoCargo, 
                                                    dbo.ComisionesSpigaTallerPorOT.TipoIntCargo, dbo.ComisionesSpigaTallerPorOT.marca, dbo.ComisionesSpigaTallerPorOT.Codigo, dbo.ComisionesSpigaTallerPorOT.descripcion, 
                                                    dbo.ComisionesSpigaTallerPorOT.TipoOperacion, dbo.ComisionesSpigaTallerPorOT.ValorUnitario, dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas, 
                                                    dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento, dbo.ComisionesSpigaTallerPorOT.ImporteImpuesto, dbo.ComisionesSpigaTallerPorOT.CedulaOperario, 
                                                    dbo.ComisionesSpigaTallerPorOT.NombreOperario, dbo.ComisionesSpigaTallerPorOT.CedulaAsesorServicioAlta, dbo.ComisionesSpigaTallerPorOT.AsesorServicioAlta, 
                                                    dbo.ComisionesSpigaTallerPorOT.CedulaAsesorServicioResponsable, dbo.ComisionesSpigaTallerPorOT.AsesorServicioResponsable, dbo.ComisionesSpigaTallerPorOT.CedulaAsesorServicioCierre, 
                                                    dbo.ComisionesSpigaTallerPorOT.AsesorServicioCierre, dbo.ComisionesSpigaTallerPorOT.CedulaAsesorServicioRetirada, dbo.ComisionesSpigaTallerPorOT.AsesorServicioRetirada, 
                                                    dbo.ComisionesSpigaTallerPorOT.TrabajoRetorno, dbo.ComisionesSpigaTallerPorOT.Cotizacion, dbo.ComisionesSpigaTallerPorOT.CampañaRepuesto, dbo.ComisionesSpigaTallerPorOT.CodClas1, 
                                                    dbo.ComisionesSpigaTallerPorOT.DescripClas1, dbo.ComisionesSpigaTallerPorOT.CodClas2, dbo.ComisionesSpigaTallerPorOT.DescripClas2, dbo.ComisionesSpigaTallerPorOT.CodClas3, 
                                                    dbo.ComisionesSpigaTallerPorOT.DescripClas3, dbo.ComisionesSpigaTallerPorOT.CodClas4, dbo.ComisionesSpigaTallerPorOT.DescripClas4, dbo.ComisionesSpigaTallerPorOT.CodClas5, 
                                                    dbo.ComisionesSpigaTallerPorOT.DescripClas5, dbo.ComisionesSpigaTallerPorOT.CodClas6, dbo.ComisionesSpigaTallerPorOT.DescripClas6, 
                                                    dbo.ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos AS CedulaVendedorRepuestos_Pre, dbo.ComisionesSpigaTallerPorOT.NombreVendedorRepuestos AS NombreVendedorRepuestos_Pre, 
                                                    dbo.ComisionesSpigaTallerPorOT.CedulaBodeguero, dbo.ComisionesSpigaTallerPorOT.NombreBodeguero, ES_COMERCIAL.CodigoEmpleado, ES_COMERCIAL.Empleado
                          FROM            dbo.ComisionesSpigaTallerPorOT LEFT OUTER JOIN
                                                        (SELECT DISTINCT CodigoEmpleado, Empleado
                                                          FROM            dbo.vw_EmpleadosRangosMaestras
                                                          WHERE        (IdComisionModeloSub IN (12, 13, 95, 96))) AS ES_COMERCIAL ON dbo.ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos = ES_COMERCIAL.CodigoEmpleado) AS RESULTADO
														    WHERE ((Ano_Periodo = 2017 AND Mes_Periodo >= 9) OR Ano_Periodo >= 2018) AND CodigoEmpresa <> 6





```
