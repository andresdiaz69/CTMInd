# Stored Procedure: sp_InformesIndRentabilizacionXTipo

## Usa los objetos:
- [[InformesIndRentabilizacion]]
- [[InformesIndRentabilizacionXTipo]]
- [[informesPresentaciones]]

```sql

-- =============================================
-- Author:		Freddy Guerrero
-- Create date: 2019-06-07
-- Description:	Rentabilizacion Total Importadores
-- =============================================
CREATE PROCEDURE [dbo].[sp_InformesIndRentabilizacionXTipo]
	-- Add the parameters for the stored procedure here
	 @Año as smallint ,
	 @Mes as smallint ,
	 @Empresa as smallint = 0,
	 @Tipo as smallint = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET FMTONLY OFF    
	SET NOCOUNT ON;

	if object_id(N'tempdb.dbo.#TmpInformesIndRentabilizacion', N'U') is not null
		drop TABLE #TmpInformesIndRentabilizacion 

	--declare @Mes as smallint = 12
	--declare @Año as smallint = 2019
	--declare @Empresa as smallint = 1
	declare @TipoNombre as varchar(15)

	set @TipoNombre = case
					when @Tipo = 1 then 'Importadores'
					when @Tipo = 2 then 'Concesionarios'
					when @Tipo = 3 then 'NoFranquiciados'
					else '' end

	select case when @TipoNombre = '' then 'Total' else @TipoNombre end NombrePresentacion,Año,NombreConcepto,'Acumulado a '+
	case
		when @Mes = 1  then 'Enero' 
		when @Mes = 2  then 'Febrero' 
		when @Mes = 3  then 'Marzo' 
		when @Mes = 4  then 'Abril' 
		when @Mes = 5  then 'Mayo' 
		when @Mes = 6  then 'Junio' 
		when @Mes = 7  then 'Julio' 
		when @Mes = 8  then 'Agosto' 
		when @Mes = 9  then 'Septiembre' 
		when @Mes = 10 then 'Octubre' 
		when @Mes = 11 then 'Noviembre' 
		when @Mes = 12 then 'Diciembre' 
		else 'Enero' end Titulo1,
	case 
		when @Mes=1 then sum(EneroP) 
		when @Mes=2 then sum(EneroP)  +sum(FebreroP)
		when @Mes=3 then sum(EneroP)  +sum(FebreroP)+sum(MarzoP)
		when @Mes=4 then sum(EneroP)  +sum(FebreroP)+sum(MarzoP)+sum(AbrilP)
		when @Mes=5 then sum(EneroP)  +sum(FebreroP)+sum(MarzoP)+sum(AbrilP)+sum(MayoP)
		when @Mes=6 then sum(EneroP)  +sum(FebreroP)+sum(MarzoP)+sum(AbrilP)+sum(MayoP)+sum(JunioP)
		when @Mes=7 then sum(EneroP)  +sum(FebreroP)+sum(MarzoP)+sum(AbrilP)+sum(MayoP)+sum(JunioP)+sum(JulioP)
		when @Mes=8 then sum(EneroP)  +sum(FebreroP)+sum(MarzoP)+sum(AbrilP)+sum(MayoP)+sum(JunioP)+sum(JulioP)+sum(AgostoP)
		when @Mes=9 then sum(EneroP)  +sum(FebreroP)+sum(MarzoP)+sum(AbrilP)+sum(MayoP)+sum(JunioP)+sum(JulioP)+sum(AgostoP)+sum(SeptiembreP)
		when @Mes=10 then sum(EneroP) +sum(FebreroP)+sum(MarzoP)+sum(AbrilP)+sum(MayoP)+sum(JunioP)+sum(JulioP)+sum(AgostoP)+sum(SeptiembreP)+sum(OctubreP)
		when @Mes=11 then sum(EneroP) +sum(FebreroP)+sum(MarzoP)+sum(AbrilP)+sum(MayoP)+sum(JunioP)+sum(JulioP)+sum(AgostoP)+sum(SeptiembreP)+sum(OctubreP)+sum(NoviembreP)
		when @Mes=12 then sum(EneroP) +sum(FebreroP)+sum(MarzoP)+sum(AbrilP)+sum(MayoP)+sum(JunioP)+sum(JulioP)+sum(AgostoP)+sum(SeptiembreP)+sum(OctubreP)+sum(NoviembreP)+sum(DiciembreP)
	end Presupuesto1,	 
	case 
		when @Mes=1 then sum(Enero) 
		when @Mes=2 then sum(Enero)  +sum(Febrero)
		when @Mes=3 then sum(Enero)  +sum(Febrero)+sum(Marzo)
		when @Mes=4 then sum(Enero)  +sum(Febrero)+sum(Marzo)+sum(Abril)
		when @Mes=5 then sum(Enero)  +sum(Febrero)+sum(Marzo)+sum(Abril)+sum(Mayo)
		when @Mes=6 then sum(Enero)  +sum(Febrero)+sum(Marzo)+sum(Abril)+sum(Mayo)+sum(Junio)
		when @Mes=7 then sum(Enero)  +sum(Febrero)+sum(Marzo)+sum(Abril)+sum(Mayo)+sum(Junio)+sum(Julio)
		when @Mes=8 then sum(Enero)  +sum(Febrero)+sum(Marzo)+sum(Abril)+sum(Mayo)+sum(Junio)+sum(Julio)+sum(Agosto)
		when @Mes=9 then sum(Enero)  +sum(Febrero)+sum(Marzo)+sum(Abril)+sum(Mayo)+sum(Junio)+sum(Julio)+sum(Agosto)+sum(Septiembre)
		when @Mes=10 then sum(Enero) +sum(Febrero)+sum(Marzo)+sum(Abril)+sum(Mayo)+sum(Junio)+sum(Julio)+sum(Agosto)+sum(Septiembre)+sum(Octubre)
		when @Mes=11 then sum(Enero) +sum(Febrero)+sum(Marzo)+sum(Abril)+sum(Mayo)+sum(Junio)+sum(Julio)+sum(Agosto)+sum(Septiembre)+sum(Octubre)+sum(Noviembre)
		when @Mes=12 then sum(Enero) +sum(Febrero)+sum(Marzo)+sum(Abril)+sum(Mayo)+sum(Junio)+sum(Julio)+sum(Agosto)+sum(Septiembre)+sum(Octubre)+sum(Noviembre)+sum(Diciembre)
	end Realizado1,
	case
		when @Mes = 1  then 'Enero' 
		when @Mes = 2  then 'Febrero' 
		when @Mes = 3  then 'Marzo' 
		when @Mes = 4  then 'Abril' 
		when @Mes = 5  then 'Mayo' 
		when @Mes = 6  then 'Junio' 
		when @Mes = 7  then 'Julio' 
		when @Mes = 8  then 'Agosto' 
		when @Mes = 9  then 'Septiembre' 
		when @Mes = 10 then 'Octubre' 
		when @Mes = 11 then 'Noviembre' 
		when @Mes = 12 then 'Diciembre' 
		else 'Enero' 
	end Titulo2,
	case
		when @Mes = 1  then sum(EneroP)
		when @Mes = 2  then sum(FebreroP)
		when @Mes = 3  then sum(MarzoP) 
		when @Mes = 4  then sum(AbrilP) 
		when @Mes = 5  then sum(MayoP) 
		when @Mes = 6  then sum(JunioP) 
		when @Mes = 7  then sum(JulioP) 
		when @Mes = 8  then sum(AgostoP) 
		when @Mes = 9  then sum(SeptiembreP) 
		when @Mes = 10 then sum(OctubreP) 
		when @Mes = 11 then sum(NoviembreP) 
		when @Mes = 12 then sum(DiciembreP)
		else sum(EneroP)
	end Presupuesto2,
	case
		when @Mes = 1  then sum(Enero)
		when @Mes = 2  then sum(Febrero)
		when @Mes = 3  then sum(Marzo) 
		when @Mes = 4  then sum(Abril) 
		when @Mes = 5  then sum(Mayo) 
		when @Mes = 6  then sum(Junio) 
		when @Mes = 7  then sum(Julio) 
		when @Mes = 8  then sum(Agosto) 
		when @Mes = 9  then sum(Septiembre) 
		when @Mes = 10 then sum(Octubre) 
		when @Mes = 11 then sum(Noviembre) 
		when @Mes = 12 then sum(Diciembre)
		else sum(Enero)
	end Realizado2,Orden   
	into #TmpInformesIndRentabilizacion
	from InformesIndRentabilizacion r 
	left join informesPresentaciones p on r.CodigoPresentacion = p.CodigoPresentacion 
	where  Año = @Año 
		and ( (@TipoNombre = '' and p.IndRentaTipo<>'') or
			  (@TipoNombre <> '' and p.IndRentaTipo = @TipoNombre))
		and EmpresaPrincipal = case when @Empresa <> 0 then @Empresa else EmpresaPrincipal end
	group by Año,NombreConcepto,Orden
	order by Año,Orden


	-- Inserta Indicador G Personal	(Utilidad bruta Total / Gastos de Personal)
	update #TmpInformesIndRentabilizacion set 
	Presupuesto1 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=40 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end,
	Realizado1 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=40 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end,
	Presupuesto2 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=40 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end,
	Realizado2 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=40 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end

	where Orden = 45



	-- Inserta Indicador G Arrendamiento (Utilidad bruta Total / Arrendamientos)

	update #TmpInformesIndRentabilizacion set 
	Presupuesto1 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=50 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end,
	Realizado1 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=50 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end,
	Presupuesto2 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=50 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end,
	Realizado2 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=50 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end
	where Orden = 55

	-- Inserta Indicador G Financiero (Utilidad bruta Total / Gastos Financieros)

	update #TmpInformesIndRentabilizacion set 
	Presupuesto1 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=60 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end,
	Realizado1 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=60 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end,
	Presupuesto2 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=60 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end,
	Realizado2 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=60 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end
	where Orden = 65

	-- Inserta G Personal - Indemnizaciones (Gastos de Personal - Indemnizaciones)

	update #TmpInformesIndRentabilizacion set 
	Presupuesto1 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=72 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end,
	Realizado1 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=72 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end,
	Presupuesto2 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=72 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end,
	Realizado2 = 
	case when (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10) = 0 then 0 
		 else (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=72 )/
			  (Select Presupuesto1 from #TmpInformesIndRentabilizacion b where b.Orden=10 ) 
		end
	where Orden = 75

	--tbltmep
	IF OBJECT_ID (N'dbo.InformesIndRentabilizacionXTipo', N'U') IS NOT NULL  
		drop table InformesIndRentabilizacionXTipo

	select * into InformesIndRentabilizacionXTipo from #TmpInformesIndRentabilizacion
	select * from InformesIndRentabilizacionXTipo

end

```
