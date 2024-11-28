# View: vw_RepuestosV2_Bolsas_Administrativa_Liquidacion_ORIGINAL

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosV2_Bolsas_Administrativa_6]]

```sql

CREATE VIEW [dbo].[vw_RepuestosV2_Bolsas_Administrativa_Liquidacion]
AS
SELECT        dbo.vw_RepuestosV2_Bolsas_Administrativa_6.Ano_Periodo, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.Mes_Periodo, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.CodigoEmpleado, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.CedulaVendedorRepuestos, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_6.Empleado, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.FechaRetiro, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.CodigoEmpresa, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.NombreEmpresa, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_6.CodigoCargo, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.NombreCargo, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.cod_marca, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_6.nombre_marca, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.CodigoCentro, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.NombreCentro, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_6.CantidadEmpleados, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.TopeMaximoBolsa, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.PesoAsignadoBolsa, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_6.PesoTotal, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.PesoTotalConsolidado, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.Distribucion, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_6.ValorBolsa, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.Faltantes, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.PesoBolsaOtroCargo, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_6.ValorBolsaOtroCargo, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.Comision, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.IdRangoMaestra, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_6.IdRangoVersionMax, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.IdComisionModeloSub, dbo.vw_RepuestosV2_Bolsas_Administrativa_6.IdComisionModeloSubCriterio, 
                         dbo.vw_RangosMaestrasFull.CodigoConcepto, dbo.vw_RangosMaestrasFull.CodigoConceptoAux, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosV2_Bolsas_Administrativa_6 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosV2_Bolsas_Administrativa_6.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 61) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 108) AND 
                         (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosV2_Bolsas_Administrativa_6.Comision) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosV2_Bolsas_Administrativa_6.Comision) OR
                         (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 62) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 114) AND 
                         (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosV2_Bolsas_Administrativa_6.Comision) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosV2_Bolsas_Administrativa_6.Comision)

```
