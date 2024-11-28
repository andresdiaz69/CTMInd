# View: v_Kms_OT

## Usa los objetos:
- [[spiga_InformaFacturacion]]

```sql
CREATE view [dbo].[v_Kms_OT] as
select distinct IdEmpresas,IdCentros,IdSecciones,vin,orden,factura,Kmts
from(
	select IdEmpresas,IdCentros,IdSecciones,vin,
	Orden=convert(varchar,AñoOT) + '\' + convert(varchar,Serieot) + '\' + convert(varchar,NumOT) + '\' + convert(varchar,numTrabajo),
	Factura=convert(varchar,AñoFactura) + '\' + convert(varchar,SerieFactura) + '\' + convert(varchar,NumFactura),Kmts
	from [PSCService_DB].dbo.spiga_InformaFacturacion
	--where IdEmpresas = 6
	--and IdCentros = 130
	--and IdSecciones = 589
	--and vin = 'WDC1660041B152890'
	--and year(FechaFactura)=2023
	--and month(FechaFactura)=1
)a 
--where orden = '2020\OAP\7892\8'
--and factura = '2023\3DH\1626'

```
