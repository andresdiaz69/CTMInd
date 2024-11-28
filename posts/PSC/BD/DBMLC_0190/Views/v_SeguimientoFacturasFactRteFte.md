# View: v_SeguimientoFacturasFactRteFte

## Usa los objetos:
- [[spiga_ImpuestosRetenciones]]

```sql

CREATE view [dbo].[v_SeguimientoFacturasFactRteFte] as
select IdEmpresas,idTerceros,NumeroFactura=replace(rtrim(ltrim(NumeroFactura)),' ', ''),RteFte = isnull(RteFte,0),TotalDocumento,FechaFactura
from(
	select IdEmpresas,idTerceros,NumeroFactura = isnull(serie,'') + '/' + isnull(NumFactura,0) + '/' + isnull(AñoFactura,0),RteFte=sum(RteFte),TotalDocumento,FechaFactura
	from(
		SELECT IdEmpresas,IdTerceros,c.serie,c.numfactura,c.añofactura,RteFte = ISNULL(c.Cuota,0),c.TotalDocumento,c.FechaFactura
		FROM [PSCService_DB].[dbo].spiga_ImpuestosRetenciones	c
		where c.IdImpuestoTipos in (1,2,3,4) and c.cuota <> 0
		and  c.FechaFactura >= getdate()-90
		--and c.serie = 'FC' and c.NumFactura LIKE '%AD-15728%' and c.AñoFactura =2020
		--and c.Ano_Periodo = 2023 and c.mes_periodo = 3
	)a group by IdEmpresas,idTerceros,isnull(serie,''),isnull(NumFactura,0),isnull(AñoFactura,0),TotalDocumento,FechaFactura
)b

```
