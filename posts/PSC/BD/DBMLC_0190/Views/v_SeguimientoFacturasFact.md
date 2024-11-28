# View: v_SeguimientoFacturasFact

## Usa los objetos:
- [[spiga_CuentasPorPagar]]

```sql

CREATE view [dbo].[v_SeguimientoFacturasFact] as
select c.IdEmpresas,c.NombreTercero, c.NifCif,Factura= replace(rtrim(ltrim(c.Factura)),' ' ,''),c.DescripcionMoneda,c.TotalFactura ,c.IdTerceros ,c.DescripcionSituacionEfectos,
c.FechaFactura,c.ImportePendiente
from		[PSCService_DB].[dbo].spiga_CuentasPorPagar 			c
where c.Ano_Periodo = year(getdate())
and c.mes_periodo = month(getdate())
and c.FechaFactura >= getdate()-90

```
