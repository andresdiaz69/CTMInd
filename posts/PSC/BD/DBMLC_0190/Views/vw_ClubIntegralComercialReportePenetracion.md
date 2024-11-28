# View: vw_ClubIntegralComercialReportePenetracion

## Usa los objetos:
- [[Empleados]]
- [[v_ClubIntegral_Cuenta_Vin_Financieras]]
- [[v_ClubIntegral_vin_vendedor]]
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]

```sql
CREATE view [dbo].[vw_ClubIntegralComercialReportePenetracion] as

select distinct Ano_Periodo,CedulaVendedor,Nombres,CodigoMarcaGrupo,MarcaGrupo,NitFinanciera,NombreFinanciera,isnull([1],0)Enero,isnull([2],0)Febrero,isnull([3],0)Marzo,isnull([4],0)Abril,isnull([5],0)Mayo,isnull([6],0)Junio,isnull([7],0)Julio,isnull([8],0)Agosto,isnull([9],0)Septiembre,isnull([10],0)Octubre,isnull([11],0)Noviembre,isnull([12],0)Diciembre

from 
(
select distinct c.ano_periodo,c.mes_periodo,v.CedulaVendedor,e.Nombres+' '+e.Apellido1+' '+e.Apellido2 as Nombres,e.cod_marca,ve.CodigoMarcaGrupo,vg.MarcaGrupo,c.NitFinanciera,c.NombreFinanciera,cantidad=count(c.VIN)
from		v_ClubIntegral_Cuenta_Vin_Financieras	c
left join	v_ClubIntegral_vin_vendedor				v	on	c.vin = v.vin
left join	empleados								e	on v.CedulaVendedor = e.CodigoEmpleado
left join	VehiculosMarcas							ve  on e.cod_marca = ve.CodigoMarca
left join	VehiculosMarcasGrupos					vg  on ve.CodigoMarcaGrupo = vg.CodigoMarcaGrupo
where	v.cedulavendedor is not null
and		c.ano_periodo > 2017
and		c.mes_periodo > 6
and		c.mes_periodo < 11
--and v.CedulaVendedor='232796'
group by c.ano_periodo,c.mes_periodo,v.CedulaVendedor,c.Nitfinanciera,c.NombreFinanciera,e.Nombres,e.Apellido1,e.Apellido2,e.cod_marca,ve.CodigoMarcaGrupo,vg.MarcaGrupo

)a

pivot(sum(cantidad)for mes_periodo in ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]))as PivotTable

```
