# View: v_ICA_ingresos_por_municipio_Otros_Municipios

## Usa los objetos:
- [[v_ICA_ingresos_por_municipio]]

```sql
CREATE view [dbo].[v_ICA_ingresos_por_municipio_Otros_Municipios] as

select ano_periodo,mes_periodo,Cod_Empresa,[Cod_Cuenta],[CuentaNombre],[nombreCiudad],sum(Valor) as Total from(

		SELECT ano_periodo,mes_periodo,Cod_Empresa,[Cod_Cuenta],[CuentaNombre],[nombreCiudad],[Valor]
		  FROM [v_ICA_ingresos_por_municipio]
			
	 )a 
	 where nombreCiudad = 'Bogota'
group by ano_periodo,mes_periodo,Cod_Empresa,[Cod_Cuenta],[CuentaNombre],[nombreCiudad]

union all

select ano_periodo,mes_periodo,Cod_Empresa,Cod_Cuenta,CuentaNombre,nombreCiudad,Sum(Total) as TotalGeneral
from
(
select  ano_periodo,mes_periodo,Cod_Empresa,[Cod_Cuenta],[CuentaNombre]
,case when [nombreCiudad] <> 'Bogota' then 'Otros Municipios' end as nombreCiudad
,sum(Valor) as Total from(

		SELECT ano_periodo,mes_periodo,Cod_Empresa,[Cod_Cuenta],[CuentaNombre],[nombreCiudad],[Valor]
		  FROM [v_ICA_ingresos_por_municipio]	
	 )a 
	 where nombreCiudad <> 'Bogota'
group by ano_periodo,mes_periodo,Cod_Empresa,[Cod_Cuenta],[CuentaNombre],[nombreCiudad]
)b
group by ano_periodo,mes_periodo,Cod_Empresa,[Cod_Cuenta],[CuentaNombre],[nombreCiudad]


```
