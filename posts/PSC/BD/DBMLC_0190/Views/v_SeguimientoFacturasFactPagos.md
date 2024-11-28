# View: v_SeguimientoFacturasFactPagos

## Usa los objetos:
- [[spiga_PagosCobros]]

```sql
CREATE view [dbo].[v_SeguimientoFacturasFactPagos] as
select p.IdEmpresas,p.NombreTercero , p.Factura,p.ImporteMonedaEfecto,IdTerceros=p.CodTercero ,p.SituacionEfecto,
substring(p.Factura,1,charindex('/',p.Factura,1)-1) serie,
substring(p.Factura,(charindex('/',p.Factura,1)+1),(charindex('/',p.factura,((charindex('/',p.Factura,1))+1)) )-(charindex('/',p.Factura,1))-1) Numero,
RIGHT(p.Factura,charindex('/',REVERSE(p.Factura))-1) Ano,
p.FechaCobroPago,DescripcionMoneda=p.MonedaEfecto,DescripcionSituacionEfectos=p.SituacionEfecto,p.ValorCancelado,p.ValorEfecto
--,p.procedencia
from		[PSCService_DB].[dbo].spiga_PagosCobros			p	
where p.SituacionEfecto not like '%Diferencia Cambial%'
and p.FechaCobroPago >= (getdate()-90)
and p.procedencia not like '%venta%' and p.procedencia not like '%Facturas Atípicas%'
and p.procedencia not like '%Abono Campaña Marca%' and p.procedencia not like '%Factura Garantías Taller%'
and p.procedencia not like '%Facturación Cargos Adicionales%' and p.procedencia not like '%Plantillas de Asientos%'
--and p.Ano_Periodo = year(getdate())
--and p.Mes_Periodo = month(getdate())
--and factura = 'T130/4635/2023'

```
