# Stored Procedure: sp_InformesIndRentabilizacionUtilidad

## Usa los objetos:
- [[InformesIndRentabilizacion]]
- [[InformesPresentaciones]]

```sql
-- =======================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2018-10-16 
-- Description:	GENERA INDICADOR DE RENTABILIDACION - UTILIDAD BRUTA GENERADA
-- Cambios:
-- 2019-12-03: Se agrega la linea (-) Ajustes Consolidación = Bn - Bn+++
-- =======================================================================================================================================

CREATE PROCEDURE [dbo].[sp_InformesIndRentabilizacionUtilidad]
	-- Add the parameters for the stored procedure here
	 @Año as smallint ,
	 @Mes as smallint ,
	 @Empresa as smallint = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET FMTONLY OFF
	SET NOCOUNT ON;

	select isnull(Acum_Anterior,0) Acum_Anterior,Mes,
	case when t3.CodigoPresentacion = 59 then '(-) Ajustes Consolidación' else t3.NombrePresentacion end NombrePresentacion
	,Acum_Actual,Acum_Presupuesto,case when Acum_Presupuesto<>0 then (Acum_Actual-Acum_Presupuesto)/Acum_Presupuesto else 0 end Meta,
	IndRentaTipo,@Año-1 AñoAnterior,t2.Año AñoActual,EmpresaPrincipal,IndRentaOrden
	into #InformesIndRentabilizacionUtilidad
	from

		(select   
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
			end Mes,
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
			end Acum_Actual, 	
			a.NombrePresentacion,
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
			end Acum_Presupuesto, 		
			0 Meta,
			Orden, a.CodigoPresentacion,Año
		from InformesIndRentabilizacion a 
		where Orden = 10 and Año = @Año 
		) t2 left join
		
		(select 
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
			end Acum_Anterior, Orden, a.CodigoPresentacion,Año
		from InformesIndRentabilizacion a 
		where  Orden = 10 and Año = @Año-1 
		) t1 on t1.CodigoPresentacion = t2.CodigoPresentacion and t1.Año=t2.Año-1
		left join 
		(Select CodigoPresentacion,NombrePresentacion,Tipo,Tiendas,EmpresaPresupuesto,CodigoMarca,ArbolPYG,ArbolBalance,
				IndRentaTipo,IndRentaOrden,EmpresaPrincipal,PresentacionPrincipal,IndEficiencia 
			from InformesPresentaciones 
			where IndRentaTipo <> ''
		 Union
		 Select CodigoPresentacion,NombrePresentacion,Tipo,Tiendas,EmpresaPresupuesto,CodigoMarca,ArbolPYG,ArbolBalance,
				'NoFranquiciados' IndRentaTipo,15 IndRentaOrden,EmpresaPrincipal,PresentacionPrincipal,IndEficiencia 
			from InformesPresentaciones 
			where CodigoPresentacion = 59 --BN+++
		) t3 on t2.CodigoPresentacion = t3.CodigoPresentacion 

	where (IndRentaTipo <> '' or t1.CodigoPresentacion=59)
	and EmpresaPrincipal = case when @Empresa <> 0 then @Empresa else EmpresaPrincipal end
	order by IndRentaTipo,IndRentaOrden

	
	--select * from #InformesIndRentabilizacionUtilidad order by IndRentaTipo
	
	update #InformesIndRentabilizacionUtilidad set 
	Acum_Anterior = (select Acum_Anterior from #InformesIndRentabilizacionUtilidad where NombrePresentacion = 'Bonaparte') - Acum_Anterior,
	Acum_Actual = (select Acum_Actual from #InformesIndRentabilizacionUtilidad where NombrePresentacion = 'Bonaparte') - Acum_Actual,
	Acum_Presupuesto = 0
	where NombrePresentacion = '(-) Ajustes Consolidación'

	select * from #InformesIndRentabilizacionUtilidad order by IndRentaTipo,IndRentaOrden

END


```