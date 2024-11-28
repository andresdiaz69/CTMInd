# View: vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[vw_EmpleadosRangosMaestras]]

```sql






CREATE VIEW [dbo].[vw_ComisionesSpigaAlmacenAlbaranBodegueroPorVendedorCT]
AS
SELECT        Id, IdComisionSpiga, Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, CodigoEmpresa, Empresa, CodigoCentro, Centro, CodigoSeccion, Seccion, FechaFactura, NumeroFactura, NumeroAlbaran, TipoMov, 
                         Marca, Referencia, DescripcionReferencia, Nitcliente, NombreCliente, CodigoCategoriaCliente, CategoriaCliente, UnidadesVendidas, CostoReferencia, ValorUnitarioReferencia, PorcDescuento, Impuestos, 
                         CodClasificacion1Mov, Clasificacion1Mov, CodClasificacion2Mov, Clasificacion2Mov, CodClasificacion3Mov, Clasificacion3Mov, CodClasificacion4Mov, Clasificacion4Mov, CodClasificacion5Mov, 
                         Clasificacion5Mov, CodClasificacion6Mov, Clasificacion6Mov, VentaCampaña, CedulaVendedorRepuestos_Pre, NombreVendedorRepuestos_Pre, CASE WHEN CodigoEmpleado IS NULL 
                         THEN [CedulaVendedorRepuestos_Pre] ELSE [CedulaBodeguero] END AS CedulaVendedorRepuestos, CASE WHEN CodigoEmpleado IS NULL 
                         THEN [NombreVendedorRepuestos_Pre] ELSE [NombreBodeguero] END AS NombreVendedorRepuestos, CedulaBodeguero, NombreBodeguero, CodigoEmpleado, Empleado
FROM            (SELECT        dbo.ComisionesSpigaAlmacenAlbaran.Id, dbo.ComisionesSpigaAlmacenAlbaran.IdComisionSpiga, dbo.ComisionesSpigaAlmacenAlbaran.Ano_Periodo, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.Mes_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.Ano_Spiga, dbo.ComisionesSpigaAlmacenAlbaran.Mes_Spiga, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa, dbo.ComisionesSpigaAlmacenAlbaran.Empresa, dbo.ComisionesSpigaAlmacenAlbaran.CodigoCentro, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.Centro, dbo.ComisionesSpigaAlmacenAlbaran.CodigoSeccion, dbo.ComisionesSpigaAlmacenAlbaran.Seccion, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura, dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura, dbo.ComisionesSpigaAlmacenAlbaran.NumeroAlbaran, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.TipoMov, dbo.ComisionesSpigaAlmacenAlbaran.Marca, dbo.ComisionesSpigaAlmacenAlbaran.Referencia, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.DescripcionReferencia, dbo.ComisionesSpigaAlmacenAlbaran.Nitcliente, dbo.ComisionesSpigaAlmacenAlbaran.NombreCliente, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.CodigoCategoriaCliente, dbo.ComisionesSpigaAlmacenAlbaran.CategoriaCliente, dbo.ComisionesSpigaAlmacenAlbaran.UnidadesVendidas, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.CostoReferencia, dbo.ComisionesSpigaAlmacenAlbaran.ValorUnitarioReferencia, dbo.ComisionesSpigaAlmacenAlbaran.PorcDescuento, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.Impuestos, dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion1Mov, dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion1Mov, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion2Mov, dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion2Mov, dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion3Mov, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion3Mov, dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion4Mov, dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion4Mov, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion5Mov, dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion5Mov, dbo.ComisionesSpigaAlmacenAlbaran.CodClasificacion6Mov, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.Clasificacion6Mov, dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos AS CedulaVendedorRepuestos_Pre, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.NombreVendedorRepuestos AS NombreVendedorRepuestos_Pre, dbo.ComisionesSpigaAlmacenAlbaran.CedulaBodeguero, 
                                                    dbo.ComisionesSpigaAlmacenAlbaran.NombreBodeguero, dbo.ComisionesSpigaAlmacenAlbaran.VentaCampaña, ES_COMERCIAL.CodigoEmpleado, ES_COMERCIAL.Empleado
                          FROM            dbo.ComisionesSpigaAlmacenAlbaran LEFT OUTER JOIN
                                                        (SELECT DISTINCT CodigoEmpleado, Empleado
                                                          FROM            dbo.vw_EmpleadosRangosMaestras
                                                          WHERE        (IdComisionModeloSub IN (12, 13, 95, 96))) AS ES_COMERCIAL ON dbo.ComisionesSpigaAlmacenAlbaran.CedulaVendedorRepuestos = ES_COMERCIAL.CodigoEmpleado) AS RESULTADO

														 WHERE ((Ano_Periodo = 2017 AND Mes_Periodo >= 9) OR Ano_Periodo >= 2018) AND CodigoEmpresa <> 6





```
