# Stored Procedure: sp_InformesIndUtilidadOperativaNetaMM

## Usa los objetos:
- [[InformesDefinitivos]]
- [[InformesMeses]]

```sql

-- =============================================
-- Author:		Freddy Guerrero
-- Create date: 2019-04-25
-- Description:	Eficiencia administrativa / Utilidad Operativa Neta (Mensual)
-- =============================================
CREATE PROCEDURE [dbo].[sp_InformesIndUtilidadOperativaNetaMM] 
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
set @ConceptoUtilidadoperativa = 193

Select @Año Año,MesFinal2 Mes,NombreMes,
'MIT-Villavo-Anillo Vial' Sede1,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 3 then Actual1 else 0 end) Utilidad1,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 3 then Actual1 else 0 end) Ingresos1, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 3 then Actual1 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 3 then Actual1 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 3 then Actual1 else 0 end) end Indicador1,  
'DAI.C-Villavo-Anillo Vial' Sede2,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 4 then Actual1 else 0 end) Utilidad2,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 4 then Actual1 else 0 end) Ingresos2, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 4 then Actual1 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 4 then Actual1 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 4 then Actual1 else 0 end) end Indicador2,  
'VO-Villavo-Anillo Vial' Sede3,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 10 then Actual1 else 0 end) Utilidad3,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 10 then Actual1 else 0 end) Ingresos3, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 10 then Actual1 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 10 then Actual1 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 10 then Actual1 else 0 end) end Indicador3,  
'Total-Villao' Sede4,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa then Actual1 else 0 end) Utilidad4,
	sum(case when CodigoConcepto = @ConceptoIngresos then Actual1 else 0 end) Ingresos4, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos then Actual1 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa then Actual1 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos then Actual1 else 0 end) end Indicador4,  

'MIT-Bta-Cll 13' Sede5,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 3 then Actual3 else 0 end)		Utilidad5,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 3 then Actual3 else 0 end)		Ingresos5, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 3 then Actual3 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 3 then Actual3 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 3 then Actual3 else 0 end) end Indicador5,  
'DAI.C-Bta-Cll 13' Sede6,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 4 then Actual3 else 0 end)		Utilidad6,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 4 then Actual3 else 0 end)		Ingresos6, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 4 then Actual3 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion = 4 then Actual3 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion = 4 then Actual3 else 0 end) end Indicador6,  
'Total-Cll 13' Sede7,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3,4) then Actual3 else 0 end) Utilidad7,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3,4) then Actual3 else 0 end)	Ingresos7, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3,4) then Actual3 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3,4) then Actual3 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3,4) then Actual3 else 0 end) end Indicador7,  

'MIT-Bta-Cll 170' Sede8,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual4 else 0 end) Utilidad8,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual4 else 0 end)	Ingresos8, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual4 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual4 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual4 else 0 end) end Indicador8,  
'DAI.C-Bta-Cll 170'	Sede9,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual4 else 0 end) Utilidad9,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual4 else 0 end)	Ingresos9, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual4 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual4 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual4 else 0 end) end Indicador9,  
'Total-Cll 170' Sede10,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3,4) then Actual4 else 0 end) Utilidad10,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3,4) then Actual4 else 0 end)	Ingresos10, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3,4) then Actual4 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3,4) then Actual4 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3,4) then Actual4 else 0 end) end Indicador10,  

'MIT-B/manga-Cra 27' Sede11,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual5 else 0 end)	Utilidad11,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual5 else 0 end) Ingresos11, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual5 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual5 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual5 else 0 end) end Indicador11,  
'DAI.C-B/manga-Cra 27' Sede12,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual6 else 0 end)	Utilidad12,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual6 else 0 end) Ingresos12, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual6 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual6 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual6 else 0 end) end Indicador12,  
'Total-B/manga-Cra 27' Sede13,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual5 else 0 end) +
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual6 else 0 end)	Utilidad13,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual5 else 0 end) + 
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual6 else 0 end) Ingresos13, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual5 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual5 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual5 else 0 end) end +
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual6 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual6 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual6 else 0 end) end as Indicador13,
  
  
'MIT-Ibague-Mirolindo' Sede14,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual6 else 0 end)	Utilidad14,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual6 else 0 end)		Ingresos14, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual6 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual6 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual6 else 0 end) end Indicador14,  
'DAI.V-Ibague-Mirolindo' Sede15,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual7 else 0 end)	Utilidad15,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual7 else 0 end)		Ingresos15, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual7 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual7 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual7 else 0 end) end Indicador15,  
'VO-Ibague-Mirolindo' Sede16,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (10) then Actual4 else 0 end)	Utilidad16,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (10) then Actual4 else 0 end)		Ingresos16, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (10) then Actual4 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (10) then Actual4 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (10) then Actual4 else 0 end) end Indicador16,
'Total-Ibague' Sede17,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual6 else 0 end)	+
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual7 else 0 end)	+
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (10) then Actual4 else 0 end)	Utilidad17,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual6 else 0 end)		+ 
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual7 else 0 end)		+ 
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (10) then Actual4 else 0 end)		Ingresos17, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual6 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual6 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual6 else 0 end) end +  
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual7 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual7 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual7 else 0 end) end +
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (10) then Actual4 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (10) then Actual4 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (10) then Actual4 else 0 end) end Indicador17,

'MIT-Cali-Pasoancho' Sede18,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual7 else 0 end)	Utilidad18,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual7 else 0 end) Ingresos18, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual7 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual7 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual7 else 0 end) end Indicador18,  
'DAI.C-Cali-Pasoancho' Sede19,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual8 else 0 end)	Utilidad19,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual8 else 0 end) Ingresos19, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual8 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual8 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual8 else 0 end) end Indicador19,  
'Total-Cali-Pasoancho' Sede20,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual7 else 0 end) +
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual8 else 0 end)	Utilidad20,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual7 else 0 end) + 
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual8 else 0 end) Ingresos20, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual7 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual7 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual7 else 0 end) end +
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual8 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual8 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual8 else 0 end) end as Indicador20,

'MIT-Bta-Gran Estacion' Sede21,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual8 else 0 end)	Utilidad21,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual8 else 0 end) Ingresos21, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual8 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (3) then Actual8 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (3) then Actual8 else 0 end) end Indicador21,  

'DAI.C-Ibague-Picaleña' Sede22,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual9 else 0 end)	Utilidad22,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual9 else 0 end)		Ingresos22, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual9 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual9 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual9 else 0 end) end Indicador22,  
  
'DAI.C-Duitama-V. S.Lorenzo' Sede23,
	sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual11 else 0 end)	Utilidad23,
	sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual11 else 0 end)		Ingresos23, 
	case when sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual11 else 0 end) = 0 then 0 else sum(case when CodigoConcepto = @ConceptoUtilidadoperativa and CodigoPresentacion in (4) then Actual11 else 0 end) / sum(case when CodigoConcepto = @ConceptoIngresos and CodigoPresentacion in (4) then Actual11 else 0 end) end Indicador23  

from InformesMeses left join InformesDefinitivos on Mes = MesFinal2 
where CodigoPresentacion in (3,4,10) and Año2 = 2018 and MesFinal2 =Mes and MesFinal1 <> MesFinal2 and CodigoConcepto in (193,1)
group by MesFinal2,NombreMes,Mes
order by Mes

END

```
