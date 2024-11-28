# Stored Procedure: sp_InformesIndUtilidadOperativaNeta

## Usa los objetos:
- [[InformesDefinitivos]]
- [[InformesIndUtilidadOperativaNeta]]
- [[InformesMeses]]

```sql

-- =======================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2018-10-12
-- Description:	SP QUE GENERA EL INDICADOR DE UTILIDAD OPERATIVA NETA
-- Actualizacion 2019-09-16 Se ajustan las formulas totales para las sucursales de IBG, BUC, CAL 
-- Actualización 2020-05-04 Se agrega Dai Calle 80
-- =======================================================================================================================================


CREATE PROCEDURE [dbo].[sp_InformesIndUtilidadOperativaNeta] 
	-- Add the parameters for the stored procedure here
	@Año as int	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Declare @ConceptoIngresos as smallint 
	Declare @ConceptoUtilidadoperativa as smallint 
	
	set @ConceptoIngresos = 1
	set @ConceptoUtilidadoperativa = 231

	IF OBJECT_ID (N'dbo.InformesIndUtilidadOperativaNeta', N'U') IS NOT NULL
		DELETE FROM InformesIndUtilidadOperativaNeta WHERE Año = @Año

	IF OBJECT_ID (N'dbo.InformesIndUtilidadOperativaNeta', N'U') IS NULL 
	BEGIN
		CREATE TABLE [dbo].[InformesIndUtilidadOperativaNeta](
			[Año] [int] NULL,
			[Mes] [smallint] NULL,
			[NombreMes] [nvarchar](20) NOT NULL,
			[Sede] [varchar](26) NOT NULL,
			[Utilidad] [decimal](38, 4) NULL,
			[Ingresos] [decimal](38, 4) NULL,
			[Indicador] [decimal](38, 6) NULL,
			[Orden] [int] NOT NULL
		)
	END


	insert into InformesIndUtilidadOperativaNeta
	Select @Año Año,InformesMeses.Mes,NombreMes,'MIT-Villavo-Anillo Vial' Sede,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 3 then Actual1 else 0 end) Utilidad,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 3 then Actual1 else 0 end) Ingresos, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 3 then Actual1 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 3 then Actual1 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 3 then Actual1 else 0 end) end Indicador  
		,1 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'DAI.C-Villavo-Anillo Vial' Sede2,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 4 then Actual1 else 0 end) Utilidad2,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 4 then Actual1 else 0 end) Ingresos2, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 4 then Actual1 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 4 then Actual1 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 4 then Actual1 else 0 end) end Indicador  
		,2 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'VO-Villavo-Anillo Vial' Sede3,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 10 then Actual1 else 0 end) Utilidad3,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 10 then Actual1 else 0 end) Ingresos3, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 10 then Actual1 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 10 then Actual1 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 10 then Actual1 else 0 end) end Indicador 
		,3 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'Total-Villao' Sede4,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa then Actual1 else 0 end) Utilidad4,
		sum(case when CodigoConcepto = @ConceptoIngresos then Actual1 else 0 end) Ingresos4, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos then Actual1 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa then Actual1 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos then Actual1 else 0 end) end Indicador
		,4 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'MIT-Bta-Cll 13' Sede5,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 3 then Actual3 else 0 end)		Utilidad5,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 3 then Actual3 else 0 end)		Ingresos5, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 3 then Actual3 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 3 then Actual3 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 3 then Actual3 else 0 end) end Indicador
		,5 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'DAI.C-Bta-Cll 13' Sede6,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 4 then Actual3 else 0 end)		Utilidad6,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 4 then Actual3 else 0 end)		Ingresos6, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 4 then Actual3 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 4 then Actual3 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 4 then Actual3 else 0 end) end Indicador
		,6 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'Total-Cll 13' Sede7,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3,4) then Actual3 else 0 end) Utilidad7,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3,4) then Actual3 else 0 end)	Ingresos7, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3,4) then Actual3 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3,4) then Actual3 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3,4) then Actual3 else 0 end) end Indicador
		,7 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'MIT-Bta-Cll 170' Sede8,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual4 else 0 end) Utilidad8,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual4 else 0 end)	Ingresos8, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual4 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual4 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual4 else 0 end) end Indicador
		,8 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'DAI.C-Bta-Cll 170'	Sede9,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual4 else 0 end) Utilidad9,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual4 else 0 end)	Ingresos9, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual4 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual4 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual4 else 0 end) end Indicador 
		,9 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'Total-Cll 170' Sede10,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3,4) then Actual4 else 0 end) Utilidad10,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3,4) then Actual4 else 0 end)	Ingresos10, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3,4) then Actual4 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3,4) then Actual4 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3,4) then Actual4 else 0 end) end Indicador  
		,10 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'MIT-B/manga-Cra 27' Sede11,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual5 else 0 end)	Utilidad11,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual5 else 0 end) Ingresos11, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual5 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual5 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual5 else 0 end) end Indicador 
		,11 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'DAI.C-B/manga-Cra 27' Sede12,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual6 else 0 end)	Utilidad12,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual6 else 0 end) Ingresos12, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual6 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual6 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual6 else 0 end) end Indicador 
		,12 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'Total-B/manga-Cra 27' Sede13,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual5 else 0 end) +
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual6 else 0 end)	Utilidad13,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual5 else 0 end) + 
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual6 else 0 end) Ingresos13, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual5 else 0 end + 
		              case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual6 else 0 end) = 0 then 0 
		     else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual5 else 0 end +
					  case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual6 else 0 end) / 
					  sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual5 else 0 end +
					      case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual6 else 0 end) end 
		,13 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union
  
	Select @Año Año,InformesMeses.Mes,NombreMes,'MIT-Ibague-Mirolindo' Sede14,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual6 else 0 end)	Utilidad14,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual6 else 0 end)		Ingresos14, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual6 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual6 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual6 else 0 end) end Indicador 
		,14 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'DAI.V-Ibague-Mirolindo' Sede15,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual7 else 0 end)	Utilidad15,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual7 else 0 end)		Ingresos15, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual7 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual7 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual7 else 0 end) end Indicador 
		,15 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'VO-Ibague-Mirolindo' Sede16,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (10) then Actual4 else 0 end)	Utilidad16,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (10) then Actual4 else 0 end)		Ingresos16, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (10) then Actual4 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (10) then Actual4 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (10) then Actual4 else 0 end) end Indicador
		,16 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'Total-Ibague' Sede17,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual6 else 0 end)	+
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual7 else 0 end)	+
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (10) then Actual4 else 0 end)	Utilidad17,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual6 else 0 end)		+ 
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual7 else 0 end)		+ 
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (10) then Actual4 else 0 end)		Ingresos17, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3)  then Actual6 else 0 end+
					  case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4)  then Actual7 else 0 end+
					  case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (10) then Actual4 else 0 end) = 0 then 0 
			 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual6 else 0 end +
			          case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual7 else 0 end +
					  case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (10) then Actual4 else 0 end ) /
			      sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3)  then Actual6 else 0 end+
			          case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4)  then Actual7 else 0 end+
					  case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (10) then Actual4 else 0 end) end  

		,17 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'MIT-Cali-Pasoancho' Sede18,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual7 else 0 end)	Utilidad18,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual7 else 0 end) Ingresos18, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual7 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual7 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual7 else 0 end) end Indicador  
		,18 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'DAI.C-Cali-Pasoancho' Sede19,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual8 else 0 end)	Utilidad19,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual8 else 0 end) Ingresos19, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual8 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual8 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual8 else 0 end) end Indicador 
		,19 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'Total-Cali-Pasoancho' Sede20,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual7 else 0 end) +
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual8 else 0 end)	Utilidad20,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual7 else 0 end) + 
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual8 else 0 end) Ingresos20, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual7 else 0 end + 
		              case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual8 else 0 end) = 0 then 0 
		     else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual7 else 0 end +
					  case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual8 else 0 end) / 
					  sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual7 else 0 end +
					      case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual8 else 0 end) end 
		,20 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'MIT-Bta-Gran Estacion' Sede21,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual8 else 0 end)	Utilidad21,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual8 else 0 end) Ingresos21, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual8 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual8 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual8 else 0 end) end Indicador 
		,21 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'DAI.C-Ibague-Picaleña' Sede22,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual9 else 0 end)	Utilidad22,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual9 else 0 end)		Ingresos22, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual9 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual9 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual9 else 0 end) end Indicador 
		,22 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'DAI.C-Duitama-V. S.Lorenzo' Sede23,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual11 else 0 end)	Utilidad23,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual11 else 0 end)		Ingresos23, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual11 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual11 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual11 else 0 end) end Indicador 
		,23 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes

	Union

	Select @Año Año,InformesMeses.Mes,NombreMes,'DAI.C-Bta-Cll 80' Sede24,
		sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual5 else 0 end)	Utilidad24,
		sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual5 else 0 end)		Ingresos24, 
		case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual5 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual5 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual5 else 0 end) end Indicador 
		,24 Orden
	from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
	and CodigoPresentacion in (3,4,10) and Año2 = @Año and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (@ConceptoIngresos,@ConceptoUtilidadoperativa)
	group by MesFinal2,NombreMes,Mes
	order by Orden,Mes


END

```
