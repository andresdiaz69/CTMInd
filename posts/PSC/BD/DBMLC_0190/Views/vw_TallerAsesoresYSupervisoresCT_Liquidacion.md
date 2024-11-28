# View: vw_TallerAsesoresYSupervisoresCT_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_TallerAsesoresYSupervisoresCT_4]]

```sql
CREATE VIEW [dbo].[vw_TallerAsesoresYSupervisoresCT_Liquidacion]
AS
SELECT        dbo.vw_TallerAsesoresYSupervisoresCT_4.Ano_Periodo, dbo.vw_TallerAsesoresYSupervisoresCT_4.Mes_Periodo, dbo.vw_TallerAsesoresYSupervisoresCT_4.CodigoEmpresa, 
                         dbo.vw_TallerAsesoresYSupervisoresCT_4.CedulaAsesorServicioResponsable, dbo.vw_TallerAsesoresYSupervisoresCT_4.CodigoEmpleado, dbo.vw_TallerAsesoresYSupervisoresCT_4.Empleado, 
                         dbo.vw_TallerAsesoresYSupervisoresCT_4.FechaRetiro, dbo.vw_TallerAsesoresYSupervisoresCT_4.ValorVariable, dbo.vw_TallerAsesoresYSupervisoresCT_4.ValorNeto_MAT, 
                         dbo.vw_TallerAsesoresYSupervisoresCT_4.ValorBase_MAT, dbo.vw_TallerAsesoresYSupervisoresCT_4.ValorNeto_MO, dbo.vw_TallerAsesoresYSupervisoresCT_4.ValorBase_MO, 
                         dbo.vw_TallerAsesoresYSupervisoresCT_4.ValorNeto_TOTAL, dbo.vw_TallerAsesoresYSupervisoresCT_4.ValorBase_TOTAL, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 
                         dbo.vw_TallerAsesoresYSupervisoresCT_4.IdRangoMaestra, dbo.vw_TallerAsesoresYSupervisoresCT_4.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, 
                         dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
                         dbo.vw_TallerAsesoresYSupervisoresCT_4.ValorBase_MAT * dbo.vw_RangosMaestrasFull.Valor AS Comision_MAT, 
                         dbo.vw_TallerAsesoresYSupervisoresCT_4.ValorBase_MO * dbo.vw_RangosMaestrasFull.Valor AS Comision_MO, 
                         dbo.vw_TallerAsesoresYSupervisoresCT_4.ValorBase_TOTAL * dbo.vw_RangosMaestrasFull.Valor AS Comision_TOTAL, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 
                         0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_TallerAsesoresYSupervisoresCT_4 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_TallerAsesoresYSupervisoresCT_4.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_TallerAsesoresYSupervisoresCT_4.ValorBase_TOTAL) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_TallerAsesoresYSupervisoresCT_4.ValorBase_TOTAL) AND 
                         (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 3)


```
