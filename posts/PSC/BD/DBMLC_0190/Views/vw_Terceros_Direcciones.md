# View: vw_Terceros_Direcciones

## Usa los objetos:
- [[spiga_TercerosDirecciones]]

```sql

CREATE view [dbo].[vw_Terceros_Direcciones] as
select orden,
       pkfkterceros,
	   fkDirecciontipos,
	   fkPaises,
	   FkProvincias,
	   provincia,
	   fkpoblaciones,
	   ciudad,
	   direccion,
	   principal
	    
  from (select orden = ROW_NUMBER() over(partition by pkfkterceros , fkDirecciontipos order by pktercerodirecciones_iden asc),
               pkfkterceros,		       
		       fkDirecciontipos,
			   principal,
		       pktercerodirecciones_iden, 
			   fkPaises ,
			   fkpoblaciones,
			   poblacion ciudad,
			   FkProvincias,
			   provincia,
		       isnull(FkCalleTipos,' ') +' '+ isnull(NombreCalle,'')  +' '+    isnull(Numero,'') 
			   +' '+ isnull(bloque,'') +' '+ isnull(piso,'') +' '+ isnull(puerta,'') +' '+isnull(Complemento,'') Direccion
          from [PSCService_DB].dbo.spiga_TercerosDirecciones
		 where FechaBaja is null)a
  where orden in (1,2)-- where PkFkTerceros = 863093


```
