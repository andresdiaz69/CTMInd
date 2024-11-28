# View: v_ClubIntegral_Cantidad_creditos_vendedor

## Usa los objetos:
- [[Empleados]]
- [[v_ClubIntegral_Cuenta_Vin_Financieras]]
- [[v_ClubIntegral_vin_vendedor]]
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]

```sql

CREATE view [dbo].[v_ClubIntegral_Cantidad_creditos_vendedor] as

select distinct c.ano_periodo,c.mes_periodo,v.CedulaVendedor,e.Nombres+' '+e.Apellido1+' '+e.Apellido2 as Nombres,e.cod_marca,ve.CodigoMarcaGrupo,vg.MarcaGrupo,c.NitFinanciera,c.NombreFinanciera,cantidad=count(c.VIN)
from		v_ClubIntegral_Cuenta_Vin_Financieras	c
left join	v_ClubIntegral_vin_vendedor				v	on	c.vin = v.vin
left join	empleados								e	on v.CedulaVendedor = e.CodigoEmpleado
left join	VehiculosMarcas							ve  on e.cod_marca = ve.CodigoMarca
left join	VehiculosMarcasGrupos					vg  on ve.CodigoMarcaGrupo = vg.CodigoMarcaGrupo
where	v.cedulavendedor is not null
and		c.ano_periodo > 2017
--and		c.mes_periodo = 9
group by c.ano_periodo,c.mes_periodo,v.CedulaVendedor,c.Nitfinanciera,c.NombreFinanciera,e.Nombres,e.Apellido1,e.Apellido2,e.cod_marca,ve.CodigoMarcaGrupo,vg.MarcaGrupo


```
