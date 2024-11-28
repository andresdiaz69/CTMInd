# View: vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[spiga_NotasCreditoRepuestos]]
- [[vw_EmpleadosRangosMaestras]]

```sql




CREATE VIEW [dbo].[vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCTMM]
AS
SELECT        RESULTADO.Id, RESULTADO.IdComisionSpiga, RESULTADO.Ano_Periodo, RESULTADO.Mes_Periodo, RESULTADO.Ano_Spiga, RESULTADO.Mes_Spiga, RESULTADO.CodigoEmpresa, RESULTADO.Empresa, 
                         RESULTADO.CodigoCentro, RESULTADO.Centro, RESULTADO.CodigoSeccion, RESULTADO.Seccion, RESULTADO.FechaFactura, RESULTADO.NumeroFactura, RESULTADO.NumeroAlbaran, RESULTADO.TipoMov, 
                         RESULTADO.Marca, RESULTADO.Referencia, RESULTADO.DescripcionReferencia, RESULTADO.Nitcliente, RESULTADO.NombreCliente, RESULTADO.CodigoCategoriaCliente, RESULTADO.CategoriaCliente, 
                         RESULTADO.UnidadesVendidas, RESULTADO.CostoReferencia, RESULTADO.ValorUnitarioReferencia, RESULTADO.PorcDescuento, RESULTADO.Impuestos, RESULTADO.CodClasificacion1Mov, RESULTADO.Clasificacion1Mov, 
                         RESULTADO.CodClasificacion2Mov, RESULTADO.Clasificacion2Mov, RESULTADO.CodClasificacion3Mov, RESULTADO.Clasificacion3Mov, RESULTADO.CodClasificacion4Mov, RESULTADO.Clasificacion4Mov, 
                         RESULTADO.CodClasificacion5Mov, RESULTADO.Clasificacion5Mov, RESULTADO.CodClasificacion6Mov, RESULTADO.Clasificacion6Mov, RESULTADO.VentaCampaña, RESULTADO.CedulaVendedorRepuestos_Pre, 
                         RESULTADO.NombreVendedorRepuestos_Pre, CASE WHEN CodigoEmpleado IS NULL THEN [CedulaVendedorRepuestos_Pre] ELSE [CedulaBodeguero] END AS CedulaVendedorRepuestos, 
                         CASE WHEN CodigoEmpleado IS NULL THEN [NombreVendedorRepuestos_Pre] ELSE [NombreBodeguero] END AS NombreVendedorRepuestos, RESULTADO.CedulaBodeguero, RESULTADO.NombreBodeguero, 
                         RESULTADO.CodigoEmpleado, RESULTADO.Empleado, [PSCService_DB].dbo.spiga_NotasCreditoRepuestos.NumeroNotaCredito
FROM            (SELECT        dbo.ComisionesSpigaAlmacenAlbaran.Id, dbo.ComisionesSpigaAlmacenAlbaran.IdComisionSpiga, dbo.ComisionesSpigaAlmacenAlbaran.Ano_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.Mes_Periodo, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.Ano_Spiga, dbo.ComisionesSpigaAlmacenAlbaran.Mes_Spiga, dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa, dbo.ComisionesSpigaAlmacenAlbaran.Empresa, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.CodigoCentro, dbo.ComisionesSpigaAlmacenAlbaran.Centro, dbo.ComisionesSpigaAlmacenAlbaran.CodigoSeccion, dbo.ComisionesSpigaAlmacenAlbaran.Seccion, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura, dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura, dbo.ComisionesSpigaAlmacenAlbaran.NumeroAlbaran, dbo.ComisionesSpigaAlmacenAlbaran.TipoMov, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.Marca, dbo.ComisionesSpigaAlmacenAlbaran.Referencia, dbo.ComisionesSpigaAlmacenAlbaran.DescripcionReferencia, dbo.ComisionesSpigaAlmacenAlbaran.Nitcliente, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.NombreCliente, dbo.ComisionesSpigaAlmacenAlbaran.CodigoCategoriaCliente, dbo.ComisionesSpigaAlmacenAlbaran.CategoriaCliente, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas, dbo.ComisionesSpigaAlmacenAlbaran.CostoReferencia, dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento, dbo.ComisionesSpigaAlmacenAlbaran.Impuestos, dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion1Mov, dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion2Mov, dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion2Mov, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion3Mov, dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion3Mov, dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion4Mov, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion4Mov, dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion5Mov, dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion5Mov, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion6Mov, dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion6Mov, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos AS CedulaVendedorRepuestos_Pre, dbo.ComisionesSpigaAlmacenAlbaran.NombreVendedorRepuestos AS NombreVendedorRepuestos_Pre, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.CedulaBodeguero, dbo.ComisionesSpigaAlmacenAlbaran.NombreBodeguero, dbo.ComisionesSpigaAlmacenAlbaran.VentaCampaña, ES_COMERCIAL.CodigoEmpleado, 
                                                    ES_COMERCIAL.Empleado
                          FROM            dbo.ComisionesSpigaAlmacenAlbaran LEFT OUTER JOIN
                                                        (SELECT DISTINCT CodigoEmpleado, Empleado
                                                          FROM            dbo.vw_EmpleadosRangosMaestras
                                                          WHERE        (IdComisionModeloSub IN (12, 13, 95, 96))) AS ES_COMERCIAL ON dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos = ES_COMERCIAL.CodigoEmpleado) AS RESULTADO LEFT OUTER JOIN
                         [PSCService_DB].dbo.spiga_NotasCreditoRepuestos ON RESULTADO.NumeroFactura = [PSCService_DB].dbo.spiga_NotasCreditoRepuestos.Factura AND 
                         RESULTADO.CodigoEmpresa = [PSCService_DB].dbo.spiga_NotasCreditoRepuestos.PkFkEmpresas AND RESULTADO.CodigoCentro = [PSCService_DB].dbo.spiga_NotasCreditoRepuestos.CodigoCentro
WHERE        

-- JCS: 2022/08/31 - MEJORA EL PERFORMANCE Y EXCLUYE LAS QUE TIENEN NOTA CRÉDITO
-- (RESULTADO.Ano_Periodo = 2017) AND (RESULTADO.Mes_Periodo >= 9) OR (RESULTADO.Ano_Periodo >= 2018)
RESULTADO.Ano_Periodo >= 2020
AND
NumeroNotaCredito IS NULL


```
