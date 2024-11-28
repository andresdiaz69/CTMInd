# View: vw_Terceros_Telefonos

## Usa los objetos:
- [[spiga_TercerosTelefonos]]

```sql


CREATE view [dbo].[vw_Terceros_Telefonos] as
select orden,
       pkfkterceros,
	   fktelefonoTipos,
	   numero,
	   extension,
	   principal,
	   fkpaises 
  from (select orden = ROW_NUMBER() over(partition by pkfkterceros , fktelefonotipos order by pkTercerotelefonos_iden desc ),--MS: 020724- se cambia de asc a desc para traer los telefonos mas recientes  .
               pkfkterceros,
		       pktercerotelefonos_iden,
		       fktelefonoTipos,
		       numero,
		       extension,
		       principal,
		       fkpaises  
          from [PSCService_DB].dbo.spiga_TercerosTelefonos
         where FechaBaja is null)a
  where orden in (1,2) --and PkFkTerceros = 88092





```
