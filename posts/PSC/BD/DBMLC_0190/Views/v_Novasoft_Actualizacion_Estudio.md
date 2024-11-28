# View: v_Novasoft_Actualizacion_Estudio

## Usa los objetos:
- [[GTH_AUDITORIA]]

```sql

CREATE view [dbo].[v_Novasoft_Actualizacion_Estudio] as
select cedula,fecha
from (
		select distinct orden=row_number() over(partition by cedula order by cedula,fecha desc ) ,fecha,cedula
		from(
			select fecha,Cedula= substring(descripcion,inicio,punto-inicio),descripcion 
			from(
					select fecha,inicio=buscar+2,punto,descripcion
					from(
							select fecha=convert(varchar,fecha,23),buscar=charindex(' a ',descripcion,1),punto=charindex('quien',descripcion,25),
							descripcion=replace(replace(replace(replace(replace(replace(descripcion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')
							from [Novasoft_CT_MM].dbo.GTH_AUDITORIA 
							where modulo like '%AUTORI.HV%'
							and descripcion like '%autorizó%'
							and descripcion like '%estudio :%'
					)a	
			) c 
			where inicio <> 0
		) d
)e where orden = 1

```
