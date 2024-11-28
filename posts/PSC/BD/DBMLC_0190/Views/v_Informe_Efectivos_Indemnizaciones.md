# View: v_Informe_Efectivos_Indemnizaciones

## Usa los objetos:
- [[v_MLC_Indemnizaciones_Empleados]]

```sql
CREATE view [dbo].[v_Informe_Efectivos_Indemnizaciones] as
select año,mes,Nombre_Unidad_Negocio,personas=sum(personas),TotalPagado = sum(TotalPagado)
  from (
		select año,mes,Nombre_Unidad_Negocio,Personas=sum(Personas),TotalPagado=sum(TotalPagado)
		  from (
			    select --Año=year(fec_liq),Mes=month(fec_liq),
						Año=ano_liq,Mes=per_liq,
			           Nombre_Unidad_Negocio=case when e.cedula = '93368918' then 'DAIMLER VC (VEHICULOS COMERCIALES)' 
			                                      else e.Nombre_Unidad_Negocio end,
			           Personas=0,TotalPagado=sum(val_liq)
			      from [Novasoft_CT_MM].dbo.v_MLC_Indemnizaciones_Empleados e
			   --  where ano_liq = 2023-- = 2023
				 --	and Nombre_Unidad_Negocio like '%JOHN DEERE construccion          %'
			   --cedula = '272481'
			     group by --fec_liq
				 ano_liq,per_liq,e.Nombre_Unidad_Negocio,Cedula
		       ) b
	     group by año,mes,Nombre_Unidad_Negocio
		union all
		select año,mes,Nombre_Unidad_Negocio,Personas=sum(Personas),TotalPagado=sum(TotalPagado)
		  from (
			    select año,mes,Nombre_Unidad_Negocio,personas,TotalPagado
				  from (
					   select --Año=year(fec_liq),Mes=month(fec_liq),
						Año=ano_liq,Mes=per_liq,Nombre_Unidad_Negocio=case when cedula = '93368918' then 'DAIMLER VC (VEHICULOS COMERCIALES)' else Nombre_Unidad_Negocio end,
						Personas=row_number() over (partition by cedula,ano_liq order by cedula desc),TotalPagado=0  
						from ( 
							select distinct ano_liq,per_liq,Nombre_Unidad_Negocio,cedula
							from [Novasoft_CT_MM].dbo.v_MLC_Indemnizaciones_Empleados e
							--where  ano_liq = 2023
							--and per_liq =9
							--and Nombre_Unidad_Negocio like '%JOHN DEERE construccion          %'
							--and cedula = '73229004'
						) a	
				      )a where personas = 1
		       ) b group by año,mes,Nombre_Unidad_Negocio
      )c  
	  --where año=2023
	  --and mes <=11
group by  año,mes,Nombre_Unidad_Negocio

```
