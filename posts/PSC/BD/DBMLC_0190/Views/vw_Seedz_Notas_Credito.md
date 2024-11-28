# View: vw_Seedz_Notas_Credito

## Usa los objetos:
- [[spiga_NotasCreditoRepuestos]]
- [[spiga_NotasCreditoTaller]]

```sql
CREATE view vw_Seedz_Notas_Credito as
select  distinct Nc=replace(NumeroNotaCredito,'/',''),FactOrigen=replace(Factura,'/','') 
from [PSCService_DB].dbo.spiga_NotasCreditoRepuestos
UNION ALL
select Nc= AñoNC + SerieNC + NumeroNC,FactOrigen=AñoFactura+SerieFactura+NumeroFactura
from(
	select  AñoNC = substring(NumeroNotaCredito,charindex('/',NumeroNotaCredito,charindex('/',NumeroNotaCredito,1)+1)+1,9),
	SerieNC = substring(NumeroNotaCredito,1,charindex('/',NumeroNotaCredito,1)-1),
	NumeroNC = substring(NumeroNotaCredito,charindex('/',NumeroNotaCredito,1)+1,charindex('/',NumeroNotaCredito,charindex('/',NumeroNotaCredito,1)+1)-charindex('/',NumeroNotaCredito,1)-1),
	AñoFactura = substring(NumeroFactura,charindex('/',NumeroFactura,charindex('/',NumeroFactura,1)+1)+1,9),
	SerieFactura = substring(NumeroFactura,1,charindex('/',NumeroFactura,1)-1),
	NumeroFactura = substring(NumeroFactura,charindex('/',NumeroFactura,1)+1,charindex('/',NumeroFactura,charindex('/',NumeroFactura,1)+1)-charindex('/',NumeroFactura,1)-1)
	from   [PSCService_DB].dbo.spiga_NotasCreditoTaller
)a
```
