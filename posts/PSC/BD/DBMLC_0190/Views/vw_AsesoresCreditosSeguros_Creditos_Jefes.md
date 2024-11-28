# View: vw_AsesoresCreditosSeguros_Creditos_Jefes

## Usa los objetos:
- [[InformesDefinitivos]]
- [[InformesPresentaciones]]
- [[vw_AsesoresCreditosSeguros_DisminucionBase]]
- [[vw_InformesSedesCentros]]

```sql
CREATE view [dbo].[vw_AsesoresCreditosSeguros_Creditos_Jefes] as
--Comisiones de Colocacion de Créditos
Select distinct a.CodigoPresentacion,a.NombrePresentacion,Año=Año2,MesInicial=MesInicial2,MesFinal = MesFinal2,
CodigoConcepto,NombreConcepto,Sede,s.CodigoCentro,s.NombreCentro,Valor=Valor---isnull(b.importefinanciado,0)
from(
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede1,Valor=Actual1
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede2,Valor=Actual2
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede3,Valor=Actual3
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede4,Valor=Actual4
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede5,Valor=Actual5
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede6,Valor=Actual6
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede7,Valor=Actual7
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede8,Valor=Actual8
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede9,Valor=Actual9
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede10,Valor=Actual10
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede11,Valor=Actual11
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede12,Valor=Actual12
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede13,Valor=Actual13
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede14,Valor=Actual14
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede15,Valor=Actual15
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede16,Valor=Actual16
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede17,Valor=Actual17
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede18,Valor=Actual18
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede19,Valor=Actual19
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede20,Valor=Actual20
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede21,Valor=Actual21
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede22,Valor=Actual22
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede23,Valor=Actual23
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede24,Valor=Actual24
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
	union all
	select d.CodigoPresentacion,p.NombrePresentacion,Año2,MesInicial2,MesFinal2,Orden,Balance,
	Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede=Sede25,Valor=Actual25
	from InformesComiteDB.dbo.InformesDefinitivos			d
	left join InformesComiteDB.dbo.InformesPresentaciones	p	on	d.CodigoPresentacion = p.CodigoPresentacion and d.balance = p.ArbolPYG 
	where d.balance = 17 
	and d.CodigoConcepto = 60
) a		left join InformesComiteDB.dbo.vw_InformesSedesCentros	s	on	a.CodigoPresentacion = s.CodigoPresentacion
																		and a.sede = s.NombreSede
		left join vw_AsesoresCreditosSeguros_DisminucionBase	b	on	s.CodigoCentro = b.codigocentro
																		and a.año2 = b.año
																		and a.MesInicial2 = b.mes
																		and a.MesFinal2 = b.mes
																		and b.codpresentacion = a.CodigoPresentacion
where Valor <> 0
and a.CodigoPresentacion in (3,5,6,7,8,9,10,12,17,83,93)
and s.NombreCentro not like 'CO-%'
and s.NombreCentro not like '%MESA%'
--and a.CodigoPresentacion = 17
--and a.año2 = 2022
--and a.MesFinal2 = 11
--and a.MesInicial2 = 11
--and s.NombreCentro = 'FR-Bta-Cl.170'
--order by a.sede

```
