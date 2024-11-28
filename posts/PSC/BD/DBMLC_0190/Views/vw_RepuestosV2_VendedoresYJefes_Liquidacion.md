# View: vw_RepuestosV2_VendedoresYJefes_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosV2_VendedoresYJefes_5]]

```sql










CREATE VIEW [dbo].[vw_RepuestosV2_VendedoresYJefes_Liquidacion]
AS
SELECT        dbo.vw_RepuestosV2_VendedoresYJefes_5.Ano_Periodo, dbo.vw_RepuestosV2_VendedoresYJefes_5.Mes_Periodo, dbo.vw_RepuestosV2_VendedoresYJefes_5.CodigoEmpresa, 
                         dbo.vw_RepuestosV2_VendedoresYJefes_5.CedulaVendedorRepuestos, dbo.vw_RepuestosV2_VendedoresYJefes_5.CodigoEmpleado, dbo.vw_RepuestosV2_VendedoresYJefes_5.Empleado, 
                         dbo.vw_RepuestosV2_VendedoresYJefes_5.FechaRetiro, 
						 
						 dbo.vw_RepuestosV2_VendedoresYJefes_5.ValorBaseMostrador, 
						 dbo.vw_RepuestosV2_VendedoresYJefes_5.ValorBaseTaller, 
						 dbo.vw_RepuestosV2_VendedoresYJefes_5.ValorBaseComision,

                         dbo.vw_RepuestosV2_VendedoresYJefes_5.IdRangoMaestra, dbo.vw_RepuestosV2_VendedoresYJefes_5.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 
                         dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
                         
						 dbo.vw_RangosMaestrasFull.CodigoConcepto,
						 dbo.vw_RangosMaestrasFull.CodigoConceptoAux,

						 dbo.vw_RangosMaestrasFull.Valor, 
						 dbo.vw_RangosMaestrasFull.Valor AS Comision,
						 
						  0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion,

						  CodigoCentro,
						  NombreCentro,
						  cod_marca,
						  nombre_marca,
						  CodigoCargo,
						  NombreCargo

FROM            dbo.vw_RepuestosV2_VendedoresYJefes_5 LEFT OUTER JOIN
                        dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosV2_VendedoresYJefes_5.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE 
    
(dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosV2_VendedoresYJefes_5.ValorBaseComision) 
AND 
(dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosV2_VendedoresYJefes_5.ValorBaseComision) 
AND 
                         ((dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 59 AND vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 104)  
						 OR
                         (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 60 AND vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 110)
						 OR
                         (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 91 AND vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 171))


```
