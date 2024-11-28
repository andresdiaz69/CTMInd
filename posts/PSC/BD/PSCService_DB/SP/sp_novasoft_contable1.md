# Stored Procedure: sp_novasoft_contable1

## Usa los objetos:
- [[rhh_Intconta_detalle]]

```sql

create procedure [dbo].[sp_novasoft_contable1] 
(
	
	@Fecha		DateTime
) as

--declare @Fecha		DateTime
--set @fecha = '20210228'


select *
from [Novasoft_CT_MM].dbo.rhh_Intconta_detalle
where	fec_cte = @fecha


```
