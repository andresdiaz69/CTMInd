# View: vw_TallerSupervisoresColisionMM_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_TallerSupervisoresColisionMM_5]]

```sql
CREATE VIEW [dbo].[vw_TallerSupervisoresColisionMM_Liquidacion]
AS
SELECT        dbo.vw_TallerSupervisoresColisionMM_5.Ano_Periodo, dbo.vw_TallerSupervisoresColisionMM_5.Mes_Periodo, dbo.vw_TallerSupervisoresColisionMM_5.CodigoEmpresa, 
                         dbo.vw_TallerSupervisoresColisionMM_5.CodigoSupervisor, dbo.vw_TallerSupervisoresColisionMM_5.CodigoEmpleado, dbo.vw_TallerSupervisoresColisionMM_5.Empleado, 
                         dbo.vw_TallerSupervisoresColisionMM_5.FechaRetiro, dbo.vw_TallerSupervisoresColisionMM_5.ValorVariable, dbo.vw_TallerSupervisoresColisionMM_5.ValorBase_MAT, 
                         dbo.vw_TallerSupervisoresColisionMM_5.ValorBase_MO, dbo.vw_TallerSupervisoresColisionMM_5.ValorBase_TOTAL, dbo.vw_TallerSupervisoresColisionMM_5.ValorNeto_TOTAL, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_TallerSupervisoresColisionMM_5.IdRangoMaestra, dbo.vw_TallerSupervisoresColisionMM_5.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
                         dbo.vw_TallerSupervisoresColisionMM_5.ValorBase_MAT * dbo.vw_RangosMaestrasFull.Valor AS Comision_MAT, 
                         dbo.vw_TallerSupervisoresColisionMM_5.ValorBase_MO * dbo.vw_RangosMaestrasFull.Valor AS Comision_MO, 
                         dbo.vw_TallerSupervisoresColisionMM_5.ValorBase_TOTAL * dbo.vw_RangosMaestrasFull.Valor AS Comision_TOTAL, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 
                         0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_TallerSupervisoresColisionMM_5 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_TallerSupervisoresColisionMM_5.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_TallerSupervisoresColisionMM_5.ValorBase_TOTAL) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_TallerSupervisoresColisionMM_5.ValorBase_TOTAL) AND 
                         (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 20)


```
