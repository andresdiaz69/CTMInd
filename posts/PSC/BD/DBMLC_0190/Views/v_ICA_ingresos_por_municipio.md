# View: v_ICA_ingresos_por_municipio

## Usa los objetos:
- [[ComisionesSpigaICA]]
- [[ICACuentas]]
- [[ICAMunicipios]]

```sql
CREATE view [dbo].[v_ICA_ingresos_por_municipio] as
select i.ano_periodo,i.mes_periodo,Cod_Empresa=i.PkEmpresas,i.EmpresaNombre,i.PkCentros,i.CentroNombre,Cod_Cuenta=i.PkContCtas,i.CuentaNombre,
m.codDpto,m.NombreDpto,m.CodigoCiudad,m.nombreCiudad,c.cod_Actividad_Economica,c.Nombre_Actividad_Economica,c.Descripcion_ICA,
Valor = (sum(i.Saldo)*-1)
from		ComisionesSpigaICA		i
left join	ICAMunicipios			m	on	i.PkEmpresas = m.cod_empresa
											and i.PkCentros = m.cod_centro  
left join	ICACuentas				c	on	c.cod_cuenta = i.PkContCtas
where i.PkContCtas like '4%'
--and i.ano_periodo = 2018
--and mes_periodo in (11,12)
--and i.PkEmpresas = 15
group by  i.ano_periodo,i.mes_periodo,i.PkEmpresas,i.EmpresaNombre,i.PkCentros,i.CentroNombre,i.PkContCtas,i.CuentaNombre,
m.codDpto,m.NombreDpto,m.CodigoCiudad,m.nombreCiudad,c.cod_Actividad_Economica,c.Nombre_Actividad_Economica,c.Descripcion_ICA



```
