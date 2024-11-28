# View: vw_ComercialVNJefesBonoPorObjetivos_Liquidacion

## Usa los objetos:
- [[vw_ComercialVNJefesBonoPorObjetivos_2]]
- [[vw_RangosMaestrasFull]]

```sql
CREATE VIEW [dbo].[vw_ComercialVNJefesBonoPorObjetivos_Liquidacion]
AS
SELECT        dbo.vw_ComercialVNJefesBonoPorObjetivos_2.Ano_Periodo, dbo.vw_ComercialVNJefesBonoPorObjetivos_2.Mes_Periodo, dbo.vw_ComercialVNJefesBonoPorObjetivos_2.CodigoEmpleado, 
                         dbo.vw_ComercialVNJefesBonoPorObjetivos_2.Empleado, dbo.vw_ComercialVNJefesBonoPorObjetivos_2.FechaRetiro, dbo.vw_ComercialVNJefesBonoPorObjetivos_2.CodigoEmpresa, 
                         dbo.vw_ComercialVNJefesBonoPorObjetivos_2.Empresa, dbo.vw_ComercialVNJefesBonoPorObjetivos_2.CodigoCentro, dbo.vw_ComercialVNJefesBonoPorObjetivos_2.Centro, 
                         dbo.vw_ComercialVNJefesBonoPorObjetivos_2.VehiculosRecaudados, dbo.vw_ComercialVNJefesBonoPorObjetivos_2.IdRangoMaestra, dbo.vw_ComercialVNJefesBonoPorObjetivos_2.IdRangoVersionMax, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor AS Comision, 
                         dbo.vw_ComercialVNJefesBonoPorObjetivos_2.IdLiquidacion, dbo.vw_ComercialVNJefesBonoPorObjetivos_2.IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_ComercialVNJefesBonoPorObjetivos_2 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_ComercialVNJefesBonoPorObjetivos_2.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 30) AND (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_ComercialVNJefesBonoPorObjetivos_2.VehiculosRecaudados) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_ComercialVNJefesBonoPorObjetivos_2.VehiculosRecaudados)


```
