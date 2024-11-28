# View: v_Provision_Comisiones_Ventas_nuevosJD

## Usa los objetos:
- [[InformesDefinitivos]]
- [[InformesPresentaciones]]

```sql



CREATE view [dbo].[v_Provision_Comisiones_Ventas_nuevosJD] as
Select CodigoPresentacion,Año,Mes,CodigoConcepto,NombreConcepto,Sede,
TipoSeccion = case	when CodigoPresentacion = 72 then 'JD Agricola' 
					when CodigoPresentacion = 73 then 'JD Construccion'
					when CodigoPresentacion = 74 then 'WIRTGEN'
				else 'Error' 
				end, 
Valor
from(
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede1,Valor = i.Actual1
		from [InformesComiteDB].dbo.[InformesDefinitivos]	i
		left join [InformesComiteDB].dbo.InformesPresentaciones					p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.Sede2,Valor = i.Actual2
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede3,Valor = i.Actual3
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede4,Valor = i.Actual4
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede5,Valor = i.Actual5
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede6,Valor = i.Actual6
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede7,Valor = i.Actual7
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede8,Valor = i.Actual8
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede9,Valor = i.Actual9
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede10,Valor = i.Actual10
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede11,Valor = i.Actual11
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.Sede12,Valor = i.Actual12
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.Sede13,Valor = i.Actual13
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.Sede14,Valor = i.Actual14
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.Sede15,Valor = i.Actual15
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.Sede16,Valor = i.Actual16
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.Sede17,Valor = i.Actual17
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede18,Valor = i.Actual18
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede19,Valor = i.Actual19
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede20,Valor = i.Actual20
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede21,Valor = i.Actual21
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede22,Valor = i.Actual22
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede23,Valor = i.Actual23
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede24,Valor = i.Actual24
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
		union all
		select i.CodigoPresentacion,Año=i.Año2,Mes=i.MesFinal2,i.CodigoConcepto,i.NombreConcepto,
		Sede = i.sede25,Valor = i.Actual25
		from [InformesComiteDB].dbo.InformesDefinitivos			i
		left join [InformesComiteDB].dbo.InformesPresentaciones	p      on     i.CodigoPresentacion = p.CodigoPresentacion
		where i.CodigoPresentacion in (72,73,74)
		--and i.año2 = 2020
		--and i.mesfinal2 in (5)
		and i.Balance = 17
		and i.MesFinal1 <> MesFinal2
		and i.CodigoConcepto IN (336)
) a
where sede <> ' ' 
--and Año = 2020
--and mes = 5
--and sede like '%yerba%'
--GO


```
