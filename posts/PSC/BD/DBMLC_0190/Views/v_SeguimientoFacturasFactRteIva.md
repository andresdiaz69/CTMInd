# View: v_SeguimientoFacturasFactRteIva

## Usa los objetos:
- [[spiga_ImpuestosRetenciones]]

```sql

CREATE view [dbo].[v_SeguimientoFacturasFactRteIva] as
select IdEmpresas,idTerceros,NumeroFactura=replace(rtrim(ltrim(NumeroFactura)),' ', ''),RteIVA = isnull(RteIVA,0),TotalDocumento,FechaFactura
from(
	select IdEmpresas,idTerceros,NumeroFactura = isnull(serie,'') + '/' + isnull(NumFactura,0) + '/' + isnull(AñoFactura,0),RteIVA=sum(RteIVA),TotalDocumento,FechaFactura
	from(
		SELECT IdEmpresas,IdTerceros,c.serie,c.numfactura,c.añofactura,RteIVA = ISNULL(c.Cuota,0),c.TotalDocumento,c.FechaFactura
		FROM [PSCService_DB].[dbo].spiga_ImpuestosRetenciones	c
		where c.IdImpuestoTipos=5 and c.cuota <> 0
		and  c.FechaFactura >= getdate()-90
		--and c.serie = 'FC' and c.NumFactura LIKE '%AD-15728%' and c.AñoFactura =2020
		--and c.Ano_Periodo = 2023 and c.mes_periodo = 3
	)a group by IdEmpresas,idTerceros,isnull(serie,''),isnull(NumFactura,0),isnull(AñoFactura,0),TotalDocumento,FechaFactura
)b



```
