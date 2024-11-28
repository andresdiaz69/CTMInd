# Stored Procedure: sp_InformesIndRentabilizacionDatos_v2

## Usa los objetos:
- [[informesDefinitivos]]
- [[InformesIndRentabilizacion_v2]]
- [[InformesIndRentabilizacion_v2]]
- [[informesPresentaciones]]

```sql



-- =============================================================================================================================
-- Author:		Freddy Guerrero
-- Create date: Actualizacion 2019-06-05
-- Description:	Genera los datos del indicador de rentabilizacion a partir de las presentaciones generadas
-- =============================================================================================================================

CREATE PROCEDURE [dbo].[sp_InformesIndRentabilizacionDatos_v2]

	@Año as int

AS
BEGIN

	SET NOCOUNT ON;

-- Creacion de Tablas Temporales por Usuario

	if object_id(N'tempdb.dbo.#TablaIndRentabilizacion', N'U') is not null
		drop TABLE #TablaIndRentabilizacion 

-- Selecciona los datos de InformesDefinitivos

	select CodigoPresentacion,NombrePresentacion,Año,NombreConcepto,
	sum(Enero)Enero,sum(EneroP)EneroP,sum(Febrero)Febrero,sum(FebreroP)FebreroP,sum(Marzo)Marzo,sum(MarzoP)MarzoP,
	sum(Abril)Abril,sum(AbrilP)AbrilP,sum(Mayo)Mayo,sum(MayoP)MayoP,sum(Junio)Junio,sum(JunioP)JunioP,
	sum(Julio)Julio,sum(JulioP)JulioP,sum(Agosto)Agosto,sum(AgostoP)AgostoP,sum(Septiembre)Septiembre,sum(SeptiembreP)SeptiembreP,
	sum(Octubre)Octubre,sum(OctubreP)OctubreP,sum(Noviembre)Noviembre,sum(NoviembreP)NoviembreP,sum(Diciembre)Diciembre,sum(DiciembreP)DiciembreP,
	sum(Enero+Febrero+Marzo+Abril+Mayo+Junio+Julio+Agosto+Septiembre+Octubre+Noviembre+Diciembre) Acumulado,
	sum(EneroP+FebreroP+MarzoP+AbrilP+MayoP+JunioP+JulioP+AgostoP+SeptiembreP+OctubreP+NoviembreP+DiciembreP) AcumuladoP,
	sum(Enero) PorcentajePPTO, 
	sum(Enero) E,
	Orden
	into #TablaIndRentabilizacion
	from (
		select b.NombrePresentacion,a.año2 Año,
				case when a.NombreConcepto in ('Nuevos','Usados','Repuestos','Mano de Obra') then 'Utilidad Bruta Ventas' else a.NombreConcepto end NombreConcepto,
				sum(isnull(case when a.Mesfinal2 = 1 and Codigoconcepto = 194 then Actualtotal*1 when a.Mesfinal2 = 1 and Codigoconcepto <> 194 then Actualtotal end,0)) Enero,
				sum(isnull(case when a.Mesfinal2 = 1 and Codigoconcepto = 194 then PresupuestoTotal*1 when a.Mesfinal2 = 1 and Codigoconcepto <> 194 then PresupuestoTotal end,0)) EneroP,
				sum(isnull(case when a.Mesfinal2 = 2 and Codigoconcepto = 194 then Actualtotal*1 when a.Mesfinal2 = 2 and Codigoconcepto <> 194 then Actualtotal end,0)) Febrero,
				sum(isnull(case when a.Mesfinal2 = 2 and Codigoconcepto = 194 then PresupuestoTotal*1 when a.Mesfinal2 = 2 and Codigoconcepto <> 194 then PresupuestoTotal end,0)) FebreroP,
				sum(isnull(case when a.Mesfinal2 = 3 and Codigoconcepto = 194 then Actualtotal*1 when a.Mesfinal2 = 3 and Codigoconcepto <> 194 then Actualtotal end,0)) Marzo,
				sum(isnull(case when a.Mesfinal2 = 3 and Codigoconcepto = 194 then PresupuestoTotal*1 when a.Mesfinal2 = 3 and Codigoconcepto <> 194 then PresupuestoTotal end,0)) MarzoP,
				sum(isnull(case when a.Mesfinal2 = 4 and Codigoconcepto = 194 then Actualtotal*1 when a.Mesfinal2 = 4 and Codigoconcepto <> 194 then Actualtotal end,0)) Abril,
				sum(isnull(case when a.Mesfinal2 = 4 and Codigoconcepto = 194 then PresupuestoTotal*1 when a.Mesfinal2 = 4 and Codigoconcepto <> 194 then PresupuestoTotal end,0)) AbrilP,
				sum(isnull(case when a.Mesfinal2 = 5 and Codigoconcepto = 194 then Actualtotal*1 when a.Mesfinal2 = 5 and Codigoconcepto <> 194 then Actualtotal end,0)) Mayo,
				sum(isnull(case when a.Mesfinal2 = 5 and Codigoconcepto = 194 then PresupuestoTotal*1 when a.Mesfinal2 = 5 and Codigoconcepto <> 194 then PresupuestoTotal end,0)) MayoP,
				sum(isnull(case when a.Mesfinal2 = 6 and Codigoconcepto = 194 then Actualtotal*1 when a.Mesfinal2 = 6 and Codigoconcepto <> 194 then Actualtotal end,0)) Junio,
				sum(isnull(case when a.Mesfinal2 = 6 and Codigoconcepto = 194 then PresupuestoTotal*1 when a.Mesfinal2 = 6 and Codigoconcepto <> 194 then PresupuestoTotal end,0)) JunioP,
				sum(isnull(case when a.Mesfinal2 = 7 and Codigoconcepto = 194 then Actualtotal*1 when a.Mesfinal2 = 7 and Codigoconcepto <> 194 then Actualtotal end,0)) Julio,
				sum(isnull(case when a.Mesfinal2 = 7 and Codigoconcepto = 194 then PresupuestoTotal*1 when a.Mesfinal2 = 7 and Codigoconcepto <> 194 then PresupuestoTotal end,0)) JulioP,
				sum(isnull(case when a.Mesfinal2 = 8 and Codigoconcepto = 194 then Actualtotal*1 when a.Mesfinal2 = 8 and Codigoconcepto <> 194 then Actualtotal end,0)) Agosto,
				sum(isnull(case when a.Mesfinal2 = 8 and Codigoconcepto = 194 then PresupuestoTotal*1 when a.Mesfinal2 = 8 and Codigoconcepto <> 194 then PresupuestoTotal end,0)) AgostoP,
				sum(isnull(case when a.Mesfinal2 = 9 and Codigoconcepto = 194 then Actualtotal*1 when a.Mesfinal2 = 9 and Codigoconcepto <> 194 then Actualtotal end,0)) Septiembre,
				sum(isnull(case when a.Mesfinal2 = 9 and Codigoconcepto = 194 then PresupuestoTotal*1 when a.Mesfinal2 = 9 and Codigoconcepto <> 194 then PresupuestoTotal end,0)) SeptiembreP,
				sum(isnull(case when a.Mesfinal2 = 10 and Codigoconcepto = 194 then Actualtotal*1 when a.Mesfinal2 = 10 and Codigoconcepto <> 194 then Actualtotal end,0)) Octubre,
				sum(isnull(case when a.Mesfinal2 = 10 and Codigoconcepto = 194 then PresupuestoTotal*1 when a.Mesfinal2 = 10 and Codigoconcepto <> 194 then PresupuestoTotal end,0)) OctubreP,
				sum(isnull(case when a.Mesfinal2 = 11 and Codigoconcepto = 194 then Actualtotal*1 when a.Mesfinal2 = 11 and Codigoconcepto <> 194 then Actualtotal end,0)) Noviembre,
				sum(isnull(case when a.Mesfinal2 = 11 and Codigoconcepto = 194 then PresupuestoTotal*1 when a.Mesfinal2 = 11 and Codigoconcepto <> 194 then PresupuestoTotal end,0)) NoviembreP,
				sum(isnull(case when a.Mesfinal2 = 12 and Codigoconcepto = 194 then Actualtotal*1 when a.Mesfinal2 = 12 and Codigoconcepto <> 194 then Actualtotal end,0)) Diciembre,
				sum(isnull(case when a.Mesfinal2 = 12 and Codigoconcepto = 194 then PresupuestoTotal*1 when a.Mesfinal2 = 12 and Codigoconcepto <> 194 then PresupuestoTotal end,0)) DiciembreP,
				case 
					when CodigoConcepto = 63 then 10
					when CodigoConcepto in (30000,30001,30002,30003) then 20
					when CodigoConcepto = 30004 then 30
					when CodigoConcepto = 125 then 40
					when CodigoConcepto = 151 then 50
					when CodigoConcepto = 194 then 60
					when CodigoConcepto = 137 then 70
					else 0
				end Orden,
				a.CodigoPresentacion
			from informesDefinitivos A left join
				informesPresentaciones B on a.CodigoPresentacion=b.CodigoPresentacion
			where 
				balance= 17
				and a.año2 = @Año
				and MesFinal1 <> MesFinal2
				and (
					Codigoconcepto in (63)							-- Utilidad bruta Total		10-	31
					or	Codigoconcepto in (30000,30001,30002,30003)	-- Utilidad Bruta Ventas	20-	34
					or	Codigoconcepto in (30004)					-- Otros ingresos			30-	40 45 49
					or	Codigoconcepto in (125)						-- Gastos de Personal		40-	66 79 83
					or	Codigoconcepto in (151)						-- Arrendamientos			50- 107 111
					or	Codigoconcepto in (194)						-- Costo financiero * -1	60- 139 154 158
					or	Codigoconcepto in (137)						-- Indemnizaciones * -1		70-	78 91 95
				)
			group by b.NombrePresentacion,a.año2,a.CodigoPresentacion,a.NombreConcepto,a.CodigoConcepto 
	) Datos
	group by  NombrePresentacion,año,CodigoPresentacion,NombreConcepto,Orden
	order by CodigoPresentacion,Orden

	update #TablaIndRentabilizacion set NombreConcepto='Gastos Financieros' where NombreConcepto='COSTO FINANCIERO NETO'



-- Inserta Indicador G Personal	(Utilidad bruta Total / Gastos de Personal)

	insert into #TablaIndRentabilizacion

		select CodigoPresentacion,a.NombrePresentacion,a.Año,'Indicador G Personal' NombreConcepto,
		case when (Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10)<>0 then
			(Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Enero,
		case when (Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10)<>0 then
			(Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end EneroP,

		case when (Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<>0 then
			(Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Febrero,
		case when (Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<>0 then
			(Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end FebreroP,

		case when (Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<> 0 then
			(Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Marzo,
		case when (Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<> 0 then
			(Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end MarzoP,

		case when (Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Abril,
		case when (Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end AbrilP,

		case when (Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Mayo,
		case when (Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end MayoP,

		case when (Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Junio,
		case when (Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end JunioP,

		case when (Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Julio,
		case when (Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end JulioP,

		case when (Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Agosto,
		case when (Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end AgostoP,

		case when (Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Septiembre,
		case when (Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end SeptiembreP,

		case when (Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Octubre,
		case when (Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end OctubreP,

		case when (Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Noviembre,
		case when (Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end NoviembreP,

		case when (Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Diciembre,
		case when (Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end DiciembreP,

		case when (Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Acumulado,
		case when (Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )/
			(Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end AcumuladoP,
		0 PorcentajePPTO,0 E ,45 Orden
		from #TablaIndRentabilizacion a
		where Orden = 10
		ORDER BY CodigoPresentacion, Orden


-- Inserta Indicador G Arrendamiento (Utilidad bruta Total / Arrendamientos)

	insert into #TablaIndRentabilizacion

		select CodigoPresentacion,a.NombrePresentacion,a.Año,'Indicador G Arrendamiento' NombreConcepto,
		case when (Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10)<>0 then
			(Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Enero,
		case when (Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10)<>0 then
			(Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end EneroP,

		case when (Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<>0 then
			(Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Febrero,
		case when (Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<>0 then
			(Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end FebreroP,

		case when (Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<> 0 then
			(Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Marzo,
		case when (Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<> 0 then
			(Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end MarzoP,

		case when (Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Abril,
		case when (Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end AbrilP,

		case when (Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Mayo,
		case when (Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end MayoP,

		case when (Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Junio,
		case when (Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end JunioP,

		case when (Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Julio,
		case when (Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end JulioP,

		case when (Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Agosto,
		case when (Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end AgostoP,

		case when (Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Septiembre,
		case when (Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end SeptiembreP,

		case when (Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Octubre,
		case when (Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end OctubreP,

		case when (Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Noviembre,
		case when (Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end NoviembreP,

		case when (Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Diciembre,
		case when (Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end DiciembreP,

		case when (Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Acumulado,
		case when (Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=50 )/
			(Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end AcumuladoP,
		0,0,55 Orden
		from #TablaIndRentabilizacion a
		where Orden = 10
		ORDER BY CodigoPresentacion, Orden



-- Inserta Indicador G Financiero (Utilidad bruta Total / Gastos Financieros)

	insert into #TablaIndRentabilizacion

		select CodigoPresentacion,a.NombrePresentacion,a.Año,'Indicador G Financiero' NombreConcepto,
		case when (Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10)<>0 then
			(Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Enero,
		case when (Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10)<>0 then
			(Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end EneroP,

		case when (Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<>0 then
			(Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Febrero,
		case when (Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<>0 then
			(Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end FebreroP,

		case when (Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<> 0 then
			(Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Marzo,
		case when (Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<> 0 then
			(Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end MarzoP,

		case when (Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Abril,
		case when (Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end AbrilP,

		case when (Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Mayo,
		case when (Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end MayoP,

		case when (Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Junio,
		case when (Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end JunioP,

		case when (Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Julio,
		case when (Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end JulioP,

		case when (Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Agosto,
		case when (Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end AgostoP,

		case when (Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Septiembre,
		case when (Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end SeptiembreP,

		case when (Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Octubre,
		case when (Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end OctubreP,

		case when (Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Noviembre,
		case when (Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end NoviembreP,

		case when (Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Diciembre,
		case when (Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end DiciembreP,

		case when (Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Acumulado,
		case when (Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
			(Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=60 )/
			(Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end AcumuladoP,

		0,0,65 Orden
		from #TablaIndRentabilizacion a
		where Orden = 10
		ORDER BY CodigoPresentacion, Orden


-- Inserta G Personal - Indemnizaciones (Gastos de Personal - Indemnizaciones)

	insert into #TablaIndRentabilizacion

		select CodigoPresentacion,a.NombrePresentacion,a.Año,'Gts Personal sin Indemnización' NombreConcepto,
		(Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) Enero,
		(Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) EneroP,

		(Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) Febrero,
		(Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) FebreroP,

		(Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) Marzo,
		(Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) MarzoP,

		(Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) Abril,
		(Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) AbrilP,

		(Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) Mayo,
		(Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) MayoP,

		(Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) Junio,
		(Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) JunioP,

		(Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) Julio,
		(Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) JulioP,

		(Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) Agosto,
		(Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) AgostoP,

		(Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) Septiembre,
		(Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) SeptiembreP,

		(Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) Octubre,
		(Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) OctubreP,

		(Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) Noviembre,
		(Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) NoviembreP,

		(Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) Diciembre,
		(Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) DiciembreP,

		(Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) Acumulado,
		(Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=40 )-
		(Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=70 ) AcumuladoP,

		0,0,72 Orden
		from #TablaIndRentabilizacion a
		where Orden = 10

	delete from #TablaIndRentabilizacion where Orden = 70


	-- Inserta Indicador G Personal sin indemnizacion (Utilidad bruta Total / G Personal sin indemnizacion)

	insert into #TablaIndRentabilizacion

	select CodigoPresentacion,a.NombrePresentacion,a.Año,'Indicador G Personal sin Indemnización' NombreConcepto,
	case when (Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10)<>0 then
		(Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select Enero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Enero,
	case when (Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10)<>0 then
		(Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select EneroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end EneroP,

	case when (Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<>0 then
		(Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select Febrero from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Febrero,
	case when (Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<>0 then
		(Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select FebreroP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end FebreroP,

	case when (Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<> 0 then
		(Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select Marzo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Marzo,
	case when (Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 )<> 0 then
		(Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select MarzoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end MarzoP,

	case when (Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select Abril from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Abril,
	case when (Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select AbrilP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end AbrilP,

	case when (Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select Mayo from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Mayo,
	case when (Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select MayoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end MayoP,

	case when (Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select Junio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Junio,
	case when (Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select JunioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end JunioP,

	case when (Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select Julio from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Julio,
	case when (Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select JulioP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end JulioP,

	case when (Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select Agosto from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Agosto,
	case when (Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select AgostoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end AgostoP,

	case when (Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select Septiembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Septiembre,
	case when (Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select SeptiembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end SeptiembreP,

	case when (Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select Octubre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Octubre,
	case when (Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select OctubreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end OctubreP,

	case when (Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select Noviembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Noviembre,
	case when (Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select NoviembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end NoviembreP,

	case when (Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select Diciembre from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Diciembre,
	case when (Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select DiciembreP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end DiciembreP,

	case when (Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select Acumulado from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end Acumulado,
	case when (Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) <> 0 then
		(Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=72 )/
		(Select AcumuladoP from #TablaIndRentabilizacion b where a.CodigoPresentacion=b.CodigoPresentacion and b.Orden=10 ) else 0 end AcumuladoP,

	0,0,75 Orden
	from #TablaIndRentabilizacion a
	where Orden = 10
	ORDER BY CodigoPresentacion, Orden

-- Agrega columnas de porcentajes

	update #TablaIndRentabilizacion set PorcentajePPTO = case when AcumuladoP = 0 then 0 else Acumulado/AcumuladoP end where Orden not in(67,71,93,140)
	update #TablaIndRentabilizacion set E = 0


--Actualiza porcentaje %E

	Update #TablaIndRentabilizacion set
	E = (
		case when (select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 ) = 0 
		then 0 else
			AcumuladoP/
		(select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 )			
		end)
	where Orden = 10

	Update #TablaIndRentabilizacion set
	E = (
		case when (select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 ) = 0 
		then 0 else
			AcumuladoP/
		(select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 )			
		end)
	where Orden = 20

	Update #TablaIndRentabilizacion set
	E = (
		case when (select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 ) = 0 
		then 0 else
			AcumuladoP/
		(select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 )			
		end)
	where Orden = 30

	Update #TablaIndRentabilizacion set
	E = (
		case when (select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 ) = 0 
		then 0 else
			AcumuladoP/
		(select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 )			
		end)
	where Orden = 40

	--Update #TablaIndRentabilizacion set
	--E = (
	--	case when (select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 ) = 0 
	--	then 0 else
	--		AcumuladoP/
	--	(select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 )			
	--	end)
	--where Orden = 70

	Update #TablaIndRentabilizacion set
	E = (
		case when (select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 ) = 0 
		then 0 else
			AcumuladoP/
		(select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 )			
		end)
	where Orden = 50

	Update #TablaIndRentabilizacion set
	E = (
		case when (select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 ) = 0 
		then 0 else
			AcumuladoP/
		(select AcumuladoP from #TablaIndRentabilizacion A where A.CodigoPresentacion = #TablaIndRentabilizacion.CodigoPresentacion and A.Año = #TablaIndRentabilizacion.Año and A.Orden =10 )			
		end)
	where Orden = 60

-- Verifica la tabla resultado

		IF OBJECT_ID (N'dbo.InformesIndRentabilizacion_v2', N'U') IS NOT NULL
		begin
			delete from dbo.InformesIndRentabilizacion_v2 where año = @Año
			insert into dbo.InformesIndRentabilizacion_v2 (
				CodigoPresentacion,NombrePresentacion,Año,NombreConcepto,Enero,EneroP,Febrero,FebreroP
				,Marzo,MarzoP,Abril,AbrilP,Mayo,MayoP,Junio,JunioP,Julio,JulioP,Agosto,AgostoP
				,Septiembre,SeptiembreP,Octubre,OctubreP,Noviembre,NoviembreP,Diciembre,DiciembreP
				,Acumulado,AcumuladoP,PorcentajePPTO,E,Orden)
				select * from #TablaIndRentabilizacion
		end
		else
		begin
			select * into dbo.InformesIndRentabilizacion_v2 from #TablaIndRentabilizacion
		end



-- Selecciona datos Finales

		Select *
		from InformesIndRentabilizacion_v2 where Año = @Año
		order by CodigoPresentacion,Año,Orden

END

```
