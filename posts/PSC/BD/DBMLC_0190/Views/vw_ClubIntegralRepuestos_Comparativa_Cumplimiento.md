# View: vw_ClubIntegralRepuestos_Comparativa_Cumplimiento

## Usa los objetos:
- [[ClubIntegralRepuestosPresupuesto]]
- [[Empleados]]
- [[ExogenasPresupuestos]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]
- [[vw_ClubIntegralRepuestos_Mes_TicketEntrada]]

```sql
CREATE view [dbo].[vw_ClubIntegralRepuestos_Comparativa_Cumplimiento] as

select distinct tm.Ano_Spiga,tm.CedulaVendedorRepuestos,e.Nombres+' '+e.Apellido1+' '+e.Apellido2 as nombres,e.cod_marca,vm.IdRangoMaestra,vm.IdRangoVersionMax
,(tm.Enero)EneVendido
,case when e.cod_marca = '20' or e.cod_marca ='1' then isnull((select sum(p.Presupuesto)Presupuesto from ExogenasPresupuestos p where tm.CedulaVendedorRepuestos = p.CodigoEmpleado and tm.Ano_Spiga = p.Ano and p.Mes = '1'),0)
else isnull((select Presupuesto from ClubIntegralRepuestosPresupuesto where tm.CedulaVendedorRepuestos= CodigoEmpleado and tm.Ano_Spiga = Ano and Mes='1'),0)end as EnePresu

,(tm.Febrero)FebVendido
,case when e.cod_marca = '20' or e.cod_marca ='1' then isnull((select sum(p.Presupuesto)Presupuesto from ExogenasPresupuestos p where tm.CedulaVendedorRepuestos = p.CodigoEmpleado and tm.Ano_Spiga = p.Ano and p.Mes = '2'),0)
else isnull((select Presupuesto from ClubIntegralRepuestosPresupuesto where tm.CedulaVendedorRepuestos= CodigoEmpleado and tm.Ano_Spiga = Ano and Mes='2'),0)end as FebPresu

,(tm.Marzo)MarVendido
,case when e.cod_marca = '20' or e.cod_marca ='1' then isnull((select sum(p.Presupuesto)Presupuesto from ExogenasPresupuestos p where tm.CedulaVendedorRepuestos = p.CodigoEmpleado and tm.Ano_Spiga = p.Ano and p.Mes = '3'),0)
else isnull((select Presupuesto from ClubIntegralRepuestosPresupuesto where tm.CedulaVendedorRepuestos= CodigoEmpleado and tm.Ano_Spiga = Ano and Mes='3'),0)end as MarPresu

,(tm.Abril)AbrVendido
,case when e.cod_marca = '20' or e.cod_marca ='1' then isnull((select sum(p.Presupuesto)Presupuesto from ExogenasPresupuestos p where tm.CedulaVendedorRepuestos = p.CodigoEmpleado and tm.Ano_Spiga = p.Ano and p.Mes = '4'),0)
else isnull((select Presupuesto from ClubIntegralRepuestosPresupuesto where tm.CedulaVendedorRepuestos= CodigoEmpleado and tm.Ano_Spiga = Ano and Mes='4'),0) end as AbrPresu

,(tm.Mayo)MayVendido
,case when e.cod_marca = '20' or e.cod_marca ='1' then isnull((select sum(p.Presupuesto)Presupuesto from ExogenasPresupuestos p where tm.CedulaVendedorRepuestos = p.CodigoEmpleado and tm.Ano_Spiga = p.Ano and p.Mes = '5'),0)
else isnull((select Presupuesto from ClubIntegralRepuestosPresupuesto where tm.CedulaVendedorRepuestos= CodigoEmpleado and tm.Ano_Spiga = Ano and Mes='5'),0)end as MayPresu

,(tm.Junio)JunVendido
,case when e.cod_marca = '20' or e.cod_marca ='1' then isnull((select sum(p.Presupuesto)Presupuesto from ExogenasPresupuestos p where tm.CedulaVendedorRepuestos = p.CodigoEmpleado and tm.Ano_Spiga = p.Ano and p.Mes = '6'),0)
else isnull((select Presupuesto from ClubIntegralRepuestosPresupuesto where tm.CedulaVendedorRepuestos= CodigoEmpleado and tm.Ano_Spiga = Ano and Mes='6'),0)end as JunPresu

,(tm.Julio)JulVendido
,case when e.cod_marca = '20' or e.cod_marca ='1' then isnull((select sum(p.Presupuesto)Presupuesto from ExogenasPresupuestos p where tm.CedulaVendedorRepuestos = p.CodigoEmpleado and tm.Ano_Spiga = p.Ano and p.Mes = '7'),0)
else isnull((select Presupuesto from ClubIntegralRepuestosPresupuesto where tm.CedulaVendedorRepuestos= CodigoEmpleado and tm.Ano_Spiga = Ano and Mes='7'),0)end as JulPresu

,(tm.Agosto)AgoVendido
,case when e.cod_marca = '20' or e.cod_marca ='1' then isnull((select sum(p.Presupuesto)Presupuesto from ExogenasPresupuestos p where tm.CedulaVendedorRepuestos = p.CodigoEmpleado and tm.Ano_Spiga = p.Ano and p.Mes = '8'),0)
else isnull((select Presupuesto from ClubIntegralRepuestosPresupuesto where tm.CedulaVendedorRepuestos= CodigoEmpleado and tm.Ano_Spiga = Ano and Mes='8'),0)end as AgoPresu

,(tm.Septiembre)SepVendido
,case when e.cod_marca = '20' or e.cod_marca ='1' then isnull((select sum(p.Presupuesto)Presupuesto from ExogenasPresupuestos p where tm.CedulaVendedorRepuestos = p.CodigoEmpleado and tm.Ano_Spiga = p.Ano and p.Mes = '9'),0)
else isnull((select Presupuesto from ClubIntegralRepuestosPresupuesto where tm.CedulaVendedorRepuestos= CodigoEmpleado and tm.Ano_Spiga = Ano and Mes='9'),0)end as SepPresu

,(tm.Octubre)OctVendido
,case when e.cod_marca = '20' or e.cod_marca ='1' then isnull((select sum(p.Presupuesto)Presupuesto from ExogenasPresupuestos p where tm.CedulaVendedorRepuestos = p.CodigoEmpleado and tm.Ano_Spiga = p.Ano and p.Mes = '10'),0)
else isnull((select Presupuesto from ClubIntegralRepuestosPresupuesto where tm.CedulaVendedorRepuestos= CodigoEmpleado and tm.Ano_Spiga = Ano and Mes='10'),0)end as OctPresu

,(tm.Noviembre)NovVendido
,case when e.cod_marca = '20' or e.cod_marca ='1' then isnull((select sum(p.Presupuesto)Presupuesto from ExogenasPresupuestos p where tm.CedulaVendedorRepuestos = p.CodigoEmpleado and tm.Ano_Spiga = p.Ano and p.Mes = '11'),0)
else isnull((select Presupuesto from ClubIntegralRepuestosPresupuesto where tm.CedulaVendedorRepuestos= CodigoEmpleado and tm.Ano_Spiga = Ano and Mes='11'),0)end as NovPresu

,(tm.Diciembre)DicVendido
,case when e.cod_marca = '20' or e.cod_marca ='1' then isnull((select sum(p.Presupuesto)Presupuesto from ExogenasPresupuestos p where tm.CedulaVendedorRepuestos = p.CodigoEmpleado and tm.Ano_Spiga = p.Ano and p.Mes = '12'),0)
else isnull((select Presupuesto from ClubIntegralRepuestosPresupuesto where tm.CedulaVendedorRepuestos= CodigoEmpleado and tm.Ano_Spiga = Ano and Mes='12'),0)end as DicPresu

from vw_ClubIntegralRepuestos_Mes_TicketEntrada tm
left join ClubIntegralRepuestosPresupuesto rp on tm.CedulaVendedorRepuestos = rp.CodigoEmpleado and tm.Ano_Spiga = rp.Ano
left join vw_ClubIntegralRangoMaestrasVersionMax vm on tm.CedulaVendedorRepuestos = vm.CodigoEmpleado
left join empleados e on tm.CedulaVendedorRepuestos = e.CodigoEmpleado and e.FechaRetiro is null
where vm.IdRangoMaestra='52'
and e.nombres is not null
--and tm.CedulaVendedorRepuestos ='11206840'

```
