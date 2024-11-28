# Stored Procedure: sp_InformesIndRentabilizacionPersonal

## Usa los objetos:
- [[InformesIndMetas]]
- [[InformesIndRentabilizacion]]
- [[InformesPresentaciones]]

```sql



-- =============================================
-- Author:		Freddy Guerrero
-- Create date: 2019-07-22
-- Description:	consulta los datos necesarios para generar indicadores de Rentabilizacion por empresa según los parametros 
-- =============================================
CREATE PROCEDURE [dbo].[sp_InformesIndRentabilizacionPersonal]
	-- Add the parameters for the stored procedure here
	 @Año as smallint ,
	 @Mes as smallint ,
	 @Empresa as smallint = 0
AS
BEGIN

	--select * from InformesIndRentabilizacion order by CodigoPresentacion,Año,Orden

	--DECLARE @Año as smallint
	--DECLARE @Mes as smallint
	--DECLARE @Empresa as smallint
	--set @Año = 2019
	--set @Mes = 1
	--set @Empresa = 0

	DECLARE @Utilidad as smallint,@Concepto as smallint,@IndConcepto as smallint,@Indicador as varchar(20)
	set @Utilidad = 10
	set @Concepto = 72
	set @IndConcepto = 75
	set @Indicador = 'Personal' 

	select a.CodigoPresentacion,a.NombrePresentacion,
	a.Año AñoAnterior,
	a.UtilidadBrutaTotal AntAcuUtilidadBrutaTotal ,
	b.GtsConcepto AntAcuGtsConcepto,
	case when a.UtilidadBrutaTotal = 0 then 0 else b.GtsConcepto/a.UtilidadBrutaTotal end IndAcumAnterior,
	c.Año AñoActual,@Mes Mes,
	j.Mes ActUtilidadBrutaTotal,
	k.Mes ActGtsConcepto,
	c.Mes IndMesActual,
	d.UtilidadBrutaTotal ActAcuUtilidadBrutaTotal,
	e.GtsConcepto ActAcuGtsConcepto,
	case when d.UtilidadBrutaTotal = 0 then 0 else e.GtsConcepto/d.UtilidadBrutaTotal end IndAcumActual,
	f.UtilidadBrutaTotal PreUtilidadBrutaTotal,
	g.GtsConcepto PreGtsConcepto,
	case when f.UtilidadBrutaTotal = 0 then 0 else g.GtsConcepto/f.UtilidadBrutaTotal end IndAcumPresupuesto,
	case when h.Meta is null then 0 else h.Meta end Meta,i.IndRentaTipo 

	from 
		(select CodigoPresentacion,NombrePresentacion,
			case
				when @Mes=1 then Enero
				when @Mes=2 then Enero+Febrero
				when @Mes=3 then Enero+Febrero+Marzo
				when @Mes=4 then Enero+Febrero+Marzo+Abril
				when @Mes=5 then Enero+Febrero+Marzo+Abril+Mayo
				when @Mes=6 then Enero+Febrero+Marzo+Abril+Mayo+Junio
				when @Mes=7 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio
				when @Mes=8 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto
				when @Mes=9 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre
				when @Mes=10 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre+Octubre
				when @Mes=11 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre+Octubre+Noviembre
				when @Mes=12 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre+Octubre+Noviembre+Diciembre
			end UtilidadBrutaTotal, Orden, Año
		from InformesIndRentabilizacion   
		where Orden = @Utilidad and Año = @Año-1) a
		left join
		(select CodigoPresentacion,NombrePresentacion,
			case
				when @Mes=1 then Enero
				when @Mes=2 then Enero+Febrero
				when @Mes=3 then Enero+Febrero+Marzo
				when @Mes=4 then Enero+Febrero+Marzo+Abril
				when @Mes=5 then Enero+Febrero+Marzo+Abril+Mayo
				when @Mes=6 then Enero+Febrero+Marzo+Abril+Mayo+Junio
				when @Mes=7 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio
				when @Mes=8 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto
				when @Mes=9 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre
				when @Mes=10 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre+Octubre
				when @Mes=11 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre+Octubre+Noviembre
				when @Mes=12 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre+Octubre+Noviembre+Diciembre
			end GtsConcepto, Orden, Año
		from InformesIndRentabilizacion   
		where Orden = @Concepto and Año = @Año-1) b on a.CodigoPresentacion = b.CodigoPresentacion 
		left join
		(select CodigoPresentacion,NombrePresentacion,
			case
				when @Mes=1 then Enero
				when @Mes=2 then Febrero
				when @Mes=3 then Marzo
				when @Mes=4 then Abril
				when @Mes=5 then Mayo
				when @Mes=6 then Junio
				when @Mes=7 then Julio
				when @Mes=8 then Agosto
				when @Mes=9 then Septiembre
				when @Mes=10 then Octubre
				when @Mes=11 then Noviembre
				when @Mes=12 then Diciembre
			end Mes, Orden, Año
		from InformesIndRentabilizacion   
		where Orden = @IndConcepto and Año = @Año) c on a.CodigoPresentacion = c.CodigoPresentacion 
		left join
		(select CodigoPresentacion,NombrePresentacion,
			case
				when @Mes=1 then Enero
				when @Mes=2 then Febrero
				when @Mes=3 then Marzo
				when @Mes=4 then Abril
				when @Mes=5 then Mayo
				when @Mes=6 then Junio
				when @Mes=7 then Julio
				when @Mes=8 then Agosto
				when @Mes=9 then Septiembre
				when @Mes=10 then Octubre
				when @Mes=11 then Noviembre
				when @Mes=12 then Diciembre
			end Mes, Orden, Año
		from InformesIndRentabilizacion   
		where Orden = @Utilidad and Año = @Año) j on a.CodigoPresentacion = j.CodigoPresentacion 
		left join
		(select CodigoPresentacion,NombrePresentacion,
			case
				when @Mes=1 then Enero
				when @Mes=2 then Febrero
				when @Mes=3 then Marzo
				when @Mes=4 then Abril
				when @Mes=5 then Mayo
				when @Mes=6 then Junio
				when @Mes=7 then Julio
				when @Mes=8 then Agosto
				when @Mes=9 then Septiembre
				when @Mes=10 then Octubre
				when @Mes=11 then Noviembre
				when @Mes=12 then Diciembre
			end Mes, Orden, Año
		from InformesIndRentabilizacion   
		where Orden = @Concepto and Año = @Año) k on a.CodigoPresentacion = k.CodigoPresentacion 
		left join
		(select CodigoPresentacion,NombrePresentacion,
			case
				when @Mes=1 then Enero
				when @Mes=2 then Enero+Febrero
				when @Mes=3 then Enero+Febrero+Marzo
				when @Mes=4 then Enero+Febrero+Marzo+Abril
				when @Mes=5 then Enero+Febrero+Marzo+Abril+Mayo
				when @Mes=6 then Enero+Febrero+Marzo+Abril+Mayo+Junio
				when @Mes=7 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio
				when @Mes=8 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto
				when @Mes=9 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre
				when @Mes=10 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre+Octubre
				when @Mes=11 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre+Octubre+Noviembre
				when @Mes=12 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre+Octubre+Noviembre+Diciembre
			end UtilidadBrutaTotal, Orden, Año
		from InformesIndRentabilizacion   
		where Orden = @Utilidad and Año = @Año) d on a.CodigoPresentacion = d.CodigoPresentacion 

		left join
		(select CodigoPresentacion,NombrePresentacion,
			case
				when @Mes=1 then Enero
				when @Mes=2 then Enero+Febrero
				when @Mes=3 then Enero+Febrero+Marzo
				when @Mes=4 then Enero+Febrero+Marzo+Abril
				when @Mes=5 then Enero+Febrero+Marzo+Abril+Mayo
				when @Mes=6 then Enero+Febrero+Marzo+Abril+Mayo+Junio
				when @Mes=7 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio
				when @Mes=8 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto
				when @Mes=9 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre
				when @Mes=10 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre+Octubre
				when @Mes=11 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre+Octubre+Noviembre
				when @Mes=12 then Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre+Octubre+Noviembre+Diciembre
			end GtsConcepto, Orden, Año
		from InformesIndRentabilizacion   
		where Orden = @Concepto and Año = @Año) e on a.CodigoPresentacion = e.CodigoPresentacion 
		left join
		(select CodigoPresentacion,NombrePresentacion,
			case 
				when @Mes=1 then EneroP
				when @Mes=2 then EneroP+FebreroP
				when @Mes=3 then EneroP+FebreroP+MarzoP
				when @Mes=4 then EneroP+FebreroP+MarzoP+AbrilP
				when @Mes=5 then EneroP+FebreroP+MarzoP+AbrilP+MayoP
				when @Mes=6 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP
				when @Mes=7 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP+JulioP
				when @Mes=8 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP+JulioP+AgostoP
				when @Mes=9 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP+JulioP+AgostoP+SeptiembreP
				when @Mes=10 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP+JulioP+AgostoP+SeptiembreP+OctubreP
				when @Mes=11 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP+JulioP+AgostoP+SeptiembreP+OctubreP+NoviembreP
				when @Mes=12 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP+JulioP+AgostoP+SeptiembreP+OctubreP+NoviembreP+DiciembreP
			end UtilidadBrutaTotal, Orden, Año
		from InformesIndRentabilizacion   
		where Orden = @Utilidad and Año = @Año) f on a.CodigoPresentacion = f.CodigoPresentacion 
		left join
		(select CodigoPresentacion,NombrePresentacion,
			case 
				when @Mes=1 then EneroP
				when @Mes=2 then EneroP+FebreroP
				when @Mes=3 then EneroP+FebreroP+MarzoP
				when @Mes=4 then EneroP+FebreroP+MarzoP+AbrilP
				when @Mes=5 then EneroP+FebreroP+MarzoP+AbrilP+MayoP
				when @Mes=6 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP
				when @Mes=7 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP+JulioP
				when @Mes=8 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP+JulioP+AgostoP
				when @Mes=9 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP+JulioP+AgostoP+SeptiembreP
				when @Mes=10 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP+JulioP+AgostoP+SeptiembreP+OctubreP
				when @Mes=11 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP+JulioP+AgostoP+SeptiembreP+OctubreP+NoviembreP
				when @Mes=12 then EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP+JulioP+AgostoP+SeptiembreP+OctubreP+NoviembreP+DiciembreP
			end GtsConcepto, 
				Orden, Año
		from InformesIndRentabilizacion   
		where Orden = @Concepto and Año = @Año) g on a.CodigoPresentacion = g.CodigoPresentacion
		left join
		InformesIndMetas h on a.CodigoPresentacion = h.CodigoPresentacion and Indicador = @Indicador
		left join
		InformesPresentaciones i on a.CodigoPresentacion = i.CodigoPresentacion and 
		EmpresaPrincipal = case when @Empresa = 0 then EmpresaPrincipal else @Empresa end

	where i.IndRentaTipo <> ''
	Order by i.IndRentaTipo,i.IndRentaOrden 

end

```
