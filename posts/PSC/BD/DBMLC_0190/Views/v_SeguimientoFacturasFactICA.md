# View: v_SeguimientoFacturasFactICA

## Usa los objetos:
- [[spiga_ImpuestosRetenciones]]

```sql

CREATE view [dbo].[v_SeguimientoFacturasFactICA] as
select IdEmpresas,idTerceros,NumeroFactura=replace(rtrim(ltrim(NumeroFactura)),' ', ''),ICA = isnull(ICA,0),TotalDocumento,FechaFactura
from(
	select IdEmpresas,idTerceros,NumeroFactura = isnull(serie,'') + '/' + isnull(NumFactura,0) + '/' + isnull(AñoFactura,0),ICA=sum(ICA),TotalDocumento,FechaFactura
	from(
		SELECT IdEmpresas,IdTerceros,c.serie,c.numfactura,c.añofactura,ICA = ISNULL(c.Cuota,0),c.TotalDocumento,c.FechaFactura
		FROM [PSCService_DB].[dbo].spiga_ImpuestosRetenciones	c
		where c.IdImpuestoTipos=6 and c.cuota <> 0
		and  c.FechaFactura >= getdate()-90
		--and c.serie = 'FC' and c.NumFactura LIKE '%AD-15728%' and c.AñoFactura =2020
		--and c.Ano_Periodo = 2023 and c.mes_periodo = 3
	)a group by IdEmpresas,idTerceros,isnull(serie,''),isnull(NumFactura,0),isnull(AñoFactura,0),TotalDocumento,FechaFactura
)b


```
