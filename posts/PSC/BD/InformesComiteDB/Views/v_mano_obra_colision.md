# View: v_mano_obra_colision

## Usa los objetos:
- [[InformesDefinitivosmes]]
- [[InformesPresentaciones]]

```sql
create view v_mano_obra_colision as
select b.NombrePresentacion,a.codigopresentacion,a.sede, a.Año2,a.MesInicial2, a.actual, a.presupuesto
	from(
		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede1 as sede,actual1 as actual,Presupuesto1 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2
		
		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede2 as sede,actual2 as actual,Presupuesto2 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede3 as sede,actual3 as actual,Presupuesto3 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2
		
		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede4 as sede,actual4 as actual,Presupuesto4 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede5 as sede,actual5 as actual,Presupuesto5 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede6 as sede,actual6 as actual,Presupuesto6 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede7 as sede,actual7 as actual,Presupuesto7 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2
		
		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede8 as sede,actual8 as actual,Presupuesto8 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2
		
		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede9 as sede,actual9 as actual,Presupuesto9 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2
		
		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede10 as sede,actual10 as actual,Presupuesto10 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2
		
		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede11 as sede,actual11 as actual,Presupuesto11 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede12 as sede,actual12 as actual,Presupuesto12 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede13 as sede,actual13 as actual,Presupuesto13 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede14 as sede,actual14 as actual,Presupuesto14 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede15 as sede,actual15 as actual,Presupuesto15 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede16 as sede,actual16 as actual,Presupuesto16 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede17 as sede,actual17 as actual,Presupuesto17 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede18 as sede,actual18 as actual,Presupuesto18 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede19 as sede,actual19 as actual,Presupuesto19 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede20 as sede,actual20 as actual,Presupuesto20 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede21 as sede,actual21 as actual,Presupuesto21 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede22 as sede,actual22 as actual,Presupuesto22 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede23 as sede,actual23 as actual,Presupuesto23 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede24 as sede,actual24 as actual,Presupuesto24 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2

		union all

		select Año2,mesinicial1,mesfinal1,MesInicial2,mesfinal2,nombreconcepto,codigopresentacion, sede25 as sede,actual25 as actual,Presupuesto25 as presupuesto
		from InformesDefinitivosmes
		where CodigoPresentacion in (8,7,12,9,1,28,87,88,3,5,17,29,90,89)
		and CodigoConcepto = 53
		and balance = 17
		and MesInicial2=MesFinal2
		) a
join InformesPresentaciones b
on a.CodigoPresentacion=b.CodigoPresentacion
where sede <>''
--and b.NombrePresentacion like '%ford%'
--and año2 = 2020
--and MesInicial2 = 12
--order by año2,mesinicial2,CodigoPresentacion,sede



```
