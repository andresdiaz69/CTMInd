# View: vw_TallerAsesoresUsadosCT_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_TallerAsesoresUsadosCT_4]]

```sql

CREATE VIEW [dbo].[vw_TallerAsesoresUsadosCT_Liquidacion]
AS
SELECT        dbo.vw_TallerAsesoresUsadosCT_4.Ano_Periodo, dbo.vw_TallerAsesoresUsadosCT_4.Mes_Periodo, dbo.vw_TallerAsesoresUsadosCT_4.CodigoEmpresa, 
                         dbo.vw_TallerAsesoresUsadosCT_4.CedulaAsesorServicioResponsable, dbo.vw_TallerAsesoresUsadosCT_4.CodigoEmpleado, dbo.vw_TallerAsesoresUsadosCT_4.Empleado, dbo.vw_TallerAsesoresUsadosCT_4.FechaRetiro, 
                         dbo.vw_TallerAsesoresUsadosCT_4.ValorVariable, dbo.vw_TallerAsesoresUsadosCT_4.ValorBase_MAT, dbo.vw_TallerAsesoresUsadosCT_4.ValorBase_MO, dbo.vw_TallerAsesoresUsadosCT_4.ValorBase_TOTAL, 
                         dbo.vw_TallerAsesoresUsadosCT_4.ValorNeto_TOTAL, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_TallerAsesoresUsadosCT_4.IdRangoMaestra, dbo.vw_TallerAsesoresUsadosCT_4.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
                         
						 dbo.vw_TallerAsesoresUsadosCT_4.PorcentajeSatisfaccion, dbo.vw_TallerAsesoresUsadosCT_4.BonificacionSatisfaccion, 
						 dbo.vw_TallerAsesoresUsadosCT_4.ValorBase_MAT * dbo.vw_RangosMaestrasFull.Valor AS Comision_MAT, 
						 dbo.vw_TallerAsesoresUsadosCT_4.ValorBase_MO * dbo.vw_RangosMaestrasFull.Valor AS Comision_MO, 
                         (dbo.vw_TallerAsesoresUsadosCT_4.ValorBase_TOTAL * dbo.vw_RangosMaestrasFull.Valor) + dbo.vw_TallerAsesoresUsadosCT_4.BonificacionSatisfaccion AS Comision_TOTAL, 
						 
						 
						 dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 0 AS IdLiquidacion, 
                         0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_TallerAsesoresUsadosCT_4 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_TallerAsesoresUsadosCT_4.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_TallerAsesoresUsadosCT_4.ValorBase_TOTAL) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_TallerAsesoresUsadosCT_4.ValorBase_TOTAL) AND 
                         (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 23)



```
