# View: vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[spiga_NotasCreditoTaller]]
- [[vw_EmpleadosRangosMaestras]]

```sql




CREATE VIEW [dbo].[vw_ComisionesSpigaTallerPorOTBodegueroPorVendedorCTMM]
AS
SELECT        RESULTADO.Id, RESULTADO.IdComisionSpiga, RESULTADO.Ano_Periodo, RESULTADO.Mes_Periodo, RESULTADO.Ano_Spiga, RESULTADO.Mes_Spiga, RESULTADO.CodigoEmpresa, RESULTADO.Empresa, 
                         RESULTADO.CodigoCentro, RESULTADO.Centro, RESULTADO.CodigoSeccion, RESULTADO.Seccion, RESULTADO.NumOT, RESULTADO.NumeroFacturaTaller, RESULTADO.NumeroAlbaran, RESULTADO.FechaAperturaOrden, 
                         RESULTADO.FechaFactura, RESULTADO.fechaentrega, RESULTADO.Placa, RESULTADO.VIN, RESULTADO.FkServicioTipos, RESULTADO.Marcaveh, RESULTADO.NombreMarca, RESULTADO.Gama, RESULTADO.NombreGama, 
                         RESULTADO.NitCliente, RESULTADO.NombreCliente, RESULTADO.CodigoCategoriaCliente, RESULTADO.CategoriaCliente, RESULTADO.TipoCargo, RESULTADO.TipoIntCargo, RESULTADO.marca, RESULTADO.Codigo, 
                         RESULTADO.descripcion, RESULTADO.TipoOperacion, RESULTADO.ValorUnitario, RESULTADO.UnidadesVendidas, RESULTADO.PorcentajeDescuento, RESULTADO.ImporteImpuesto, RESULTADO.CedulaOperario, 
                         RESULTADO.NombreOperario, RESULTADO.CedulaAsesorServicioAlta, RESULTADO.AsesorServicioAlta, RESULTADO.CedulaAsesorServicioResponsable, RESULTADO.AsesorServicioResponsable, 
                         RESULTADO.CedulaAsesorServicioCierre, RESULTADO.AsesorServicioCierre, RESULTADO.CedulaAsesorServicioRetirada, RESULTADO.AsesorServicioRetirada, RESULTADO.TrabajoRetorno, RESULTADO.Cotizacion, 
                         RESULTADO.CampañaRepuesto, RESULTADO.CodClas1, RESULTADO.DescripClas1, RESULTADO.CodClas2, RESULTADO.DescripClas2, RESULTADO.CodClas3, RESULTADO.DescripClas3, RESULTADO.CodClas4, 
                         RESULTADO.DescripClas4, RESULTADO.CodClas5, RESULTADO.DescripClas5, RESULTADO.CodClas6, RESULTADO.DescripClas6, RESULTADO.CedulaVendedorRepuestos_Pre, RESULTADO.NombreVendedorRepuestos_Pre, 
                         CASE WHEN CodigoEmpleado IS NULL THEN [CedulaVendedorRepuestos_Pre] ELSE [CedulaBodeguero] END AS CedulaVendedorRepuestos, CASE WHEN CodigoEmpleado IS NULL 
                         THEN [NombreVendedorRepuestos_Pre] ELSE [NombreBodeguero] END AS NombreVendedorRepuestos, RESULTADO.CedulaBodeguero, RESULTADO.NombreBodeguero, RESULTADO.CodigoEmpleado, RESULTADO.Empleado, 
                         [PSCService_DB].dbo.spiga_NotasCreditoTaller.NumeroNotaCredito
FROM            (SELECT        dbo.ComisionesSpigaTallerPorOT.Id, dbo.ComisionesSpigaTallerPorOT.IdComisionSpiga, dbo.ComisionesSpigaTallerPorOT.Ano_Periodo, dbo.ComisionesSpigaTallerPorOT.Mes_Periodo, 
                                                    dbo.ComisionesSpigaTallerPorOT.Ano_Spiga, dbo.ComisionesSpigaTallerPorOT.Mes_Spiga, dbo.ComisionesSpigaTallerPorOT.CodigoEmpresa, dbo.ComisionesSpigaTallerPorOT.Empresa, 
                                                    dbo.ComisionesSpigaTallerPorOT.CodigoCentro, dbo.ComisionesSpigaTallerPorOT.Centro, dbo.ComisionesSpigaTallerPorOT.CodigoSeccion, dbo.ComisionesSpigaTallerPorOT.Seccion, 
                                                    dbo.ComisionesSpigaTallerPorOT.NumOT, dbo.ComisionesSpigaTallerPorOT.NumeroFacturaTaller, dbo.ComisionesSpigaTallerPorOT.NumeroAlbaran, dbo.ComisionesSpigaTallerPorOT.FechaAperturaOrden, 
                                                    dbo.ComisionesSpigaTallerPorOT.FechaFactura, dbo.ComisionesSpigaTallerPorOT.fechaentrega, dbo.ComisionesSpigaTallerPorOT.Placa, dbo.ComisionesSpigaTallerPorOT.VIN, 
                                                    dbo.ComisionesSpigaTallerPorOT.FkServicioTipos, dbo.ComisionesSpigaTallerPorOT.Marcaveh, dbo.ComisionesSpigaTallerPorOT.NombreMarca, dbo.ComisionesSpigaTallerPorOT.Gama, 
                                                    dbo.ComisionesSpigaTallerPorOT.NombreGama, dbo.ComisionesSpigaTallerPorOT.NitCliente, dbo.ComisionesSpigaTallerPorOT.NombreCliente, dbo.ComisionesSpigaTallerPorOT.CodigoCategoriaCliente, 
                                                    dbo.ComisionesSpigaTallerPorOT.CategoriaCliente, dbo.ComisionesSpigaTallerPorOT.TipoCargo, dbo.ComisionesSpigaTallerPorOT.TipoIntCargo, dbo.ComisionesSpigaTallerPorOT.marca, 
                                                    dbo.ComisionesSpigaTallerPorOT.Codigo, dbo.ComisionesSpigaTallerPorOT.descripcion, dbo.ComisionesSpigaTallerPorOT.TipoOperacion, dbo.ComisionesSpigaTallerPorOT.ValorUnitario, 
                                                    dbo.ComisionesSpigaTallerPorOT.UnidadesVendidas, dbo.ComisionesSpigaTallerPorOT.PorcentajeDescuento, dbo.ComisionesSpigaTallerPorOT.ImporteImpuesto, dbo.ComisionesSpigaTallerPorOT.CedulaOperario, 
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
                                                          WHERE        (IdComisionModeloSub IN (12, 13, 95, 96))) AS ES_COMERCIAL ON dbo.ComisionesSpigaTallerPorOT.CedulaVendedorRepuestos = ES_COMERCIAL.CodigoEmpleado) AS RESULTADO LEFT OUTER JOIN
                         [PSCService_DB].dbo.spiga_NotasCreditoTaller ON RESULTADO.NumeroFacturaTaller = [PSCService_DB].dbo.spiga_NotasCreditoTaller.NumeroFactura AND 
                         RESULTADO.CodigoEmpresa = [PSCService_DB].dbo.spiga_NotasCreditoTaller.CodigoEmpresa AND RESULTADO.CodigoCentro = [PSCService_DB].dbo.spiga_NotasCreditoTaller.CodigoCentro
WHERE        

-- JCS: 2022/08/31 - MEJORA EL PERFORMANCE Y EXCLUYE LAS QUE TIENEN NOTA CRÉDITO
-- (RESULTADO.Ano_Periodo = 2017) AND (RESULTADO.Mes_Periodo >= 9) OR (RESULTADO.Ano_Periodo >= 2018)
RESULTADO.Ano_Periodo >= 2020
AND
NumeroNotaCredito IS NULL


```
