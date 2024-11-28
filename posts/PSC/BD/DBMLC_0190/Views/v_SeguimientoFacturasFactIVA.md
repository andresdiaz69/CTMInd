# View: v_SeguimientoFacturasFactIVA

## Usa los objetos:
- [[spiga_ImpuestosImportes]]

```sql

CREATE view [dbo].[v_SeguimientoFacturasFactIVA] as
select IdEmpresas,idTerceros,NumeroFactura=replace(rtrim(ltrim(NumeroFactura)),' ', ''),IVA = isnull(IVA,0),TotalDocumento,FechaFactura
FROM(
	select IdEmpresas,idTerceros,NumeroFactura = isnull(serie,'') + '/' + isnull(NumFactura,0) + '/' + isnull(AñoFactura,0),IVA=sum(iva),TotalDocumento,FechaFactura
	from(
		SELECT IdEmpresas,IdTerceros,c.serie,c.numfactura,c.añofactura,IVA = ISNULL(c.Cuota,0),c.TotalDocumento,c.FechaFactura
		FROM [PSCService_DB].[dbo].spiga_ImpuestosImportes	c
		where c.IdImpuestoTipos=1 and c.cuota <> 0
		and  c.FechaFactura >= getdate()-90
		--and c.serie = 'FC' and c.NumFactura LIKE '%AD-15728%' and c.AñoFactura =2020
		--and c.Ano_Periodo = 2023 and c.mes_periodo = 3
	)a group by IdEmpresas,idTerceros,isnull(serie,''),isnull(NumFactura,0),isnull(AñoFactura,0),TotalDocumento,FechaFactura
)b


```
