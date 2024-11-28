# View: vw_Terceros_Correos

## Usa los objetos:
- [[spiga_Terceroscorreos]]

```sql

CREATE view [dbo].[vw_Terceros_Correos] as
select orden,
       pkfkterceros,
	   fkemailtipos,
	   email,
	   principal
	    
  from (select orden = ROW_NUMBER() over(partition by pkfkterceros , fkemailtipos order by pkTerceroemails_iden asc),
               pkfkterceros,
		       pkTerceroemails_iden,
		       fkemailtipos,
		       email,
		       principal
		         
          from [PSCService_DB].dbo.spiga_Terceroscorreos
         where FechaBaja is null)a
  where orden in (1,2)-- where PkFkTerceros = 863093

```
