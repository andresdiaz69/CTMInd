# Stored Procedure: sp_novasoft_contable

## Usa los objetos:
- [[rhh_Intconta_detalle]]

```sql

CREATE procedure [dbo].[sp_novasoft_contable] 
(
	
	@año int,
	@mes int
) as

--declare @Fecha		DateTime
--set @fecha = '20210228'


select *
from [Novasoft_CT_MM].dbo.rhh_Intconta_detalle
where	year(fec_cte) = @año
and month(fec_cte)=@mes


```
