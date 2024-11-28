# View: v_Informe_Efectivos_Indemnizaciones_empleado

## Usa los objetos:
- [[v_MLC_Indemnizaciones_Empleados]]

```sql
CREATE view [dbo].[v_Informe_Efectivos_Indemnizaciones_empleado] as
select  --Año=year(e.fec_liq),
Año=ano_liq,e.cedula,e.Nombres,e.Apellido1,e.Apellido2,
e.nombre_compañia,
e.nombre_unidad_negocio,
TotalPagado=sum(val_liq),CausaRetiro = e.nom_ret
from [Novasoft_CT_MM].dbo.v_MLC_Indemnizaciones_Empleados e
--where year(fec_liq) = 2022
group by --e.fec_liq
ano_liq,e.cedula,e.Nombres,e.Apellido1,e.Apellido2,e.nombre_compañia,
e.nombre_unidad_negocio,e.nom_ret
--order by cedula



```
