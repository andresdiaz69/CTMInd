# View: vw_ComisionesFinanciacionAsesoresPagos

## Usa los objetos:
- [[spiga_RecaudoPorVendedor]]

```sql
CREATE view vw_ComisionesFinanciacionAsesoresPagos as
select IdEmpresas,Factura= IdSeries + '/' + NumFactura + '/' + AñoFactura,
ValorPago=sum(ImporteSaldado),FechaCobroPago,IdTerceros
from [PSCService_DB].dbo.spiga_RecaudoPorVendedor
group by IdEmpresas,IdSeries,NumFactura,AñoFactura,FechaCobroPago,IdTerceros
```
