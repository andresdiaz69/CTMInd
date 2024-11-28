# Stored Procedure: sp_InformesIndEficienciaAdministrativa_v2

## Usa los objetos:
- [[InformesIndEficienciaAdministrativa_v2]]
- [[InformesPresentaciones]]
- [[InformesPresentacionesSedes]]

```sql




-- =============================================
-- Author:		Freddy Guerrero
-- Create date: 2019-02-25
-- Description:	Calcula el indicador de Absorcion Posventa
-- 2019-09-05 Se agrega calculo de Eficiencia sin GAC
-- 2020-01-21 Se corrige Error de división por 0 en Ford 2019 con redondeo
---- =============================================

CREATE PROCEDURE [dbo].[sp_InformesIndEficienciaAdministrativa_v2]
	-- Add the parameters for the stored procedure here
	@CodigoPresentacion as smallint,
	@Año as int,
	@Redondeo as bit

AS
BEGIN

	SET NOCOUNT ON;

	DECLARE @Msg as nvarchar(100)
	if not exists(Select * from InformesPresentaciones where CodigoPresentacion  = @CodigoPresentacion)
	begin
		set @Msg='La presentacion '+rtrim(cast(@CodigoPresentacion as char(2)))+ ' no existe'
		RAISERROR ( @Msg ,   0 ,   1 ) --WITH NOWAIT ---WAITFOR DELAY   '00:00:01' ;
		return
	end


	IF OBJECT_ID (N'dbo.InformesIndEficienciaAdministrativa_v2', N'U') IS NOT NULL
		DELETE FROM InformesIndEficienciaAdministrativa_v2 WHERE CodigoPresentacion = @CodigoPresentacion and Año = @Año

	declare @Balance as smallint,@ntiendas as smallint,@i as smallint,@c as char(2),@misql as varchar(MAX),@misql2 as varchar(MAX),@Divisor as varchar(10)
	set @Balance = 17
	set @i = 1
	set @misql = ''
	
	if @Redondeo = 1
	Begin
		set @Divisor = '1000000'
	end
	else
	Begin
		set @Divisor = '1'
	end

	select @ntiendas=count(*) from InformesPresentacionesSedes where CodigoPresentacion=@CodigoPresentacion
	
	set @misql = ''

	while @i <= @ntiendas
	Begin
		set @c = ltrim(rtrim(str(@i)))

		if @i = 1 
		Begin
		
			set @misql = @misql + ' select C.CodigoPresentacion,c.NombrePresentacion,'+cast(@Año as char(4))+' Año,C.Mes,C.NombreMes,'' Total'' Sede,'
			set @misql = @misql + ' sum(case when Codigoconcepto=101 then ActualTotal else 0 end) /'+@Divisor+' GastosdeOperacion,'
			set @misql = @misql + ' sum(case when Codigoconcepto=268 then ActualTotal else 0 end) /'+@Divisor+' GMC,'
			set @misql = @misql + ' sum(case when Codigoconcepto=252 then ActualTotal*(-1) else 0 end) /'+@Divisor+' GAC,'
			set @misql = @misql + ' sum(case when Codigoconcepto=63 then ActualTotal else 0 end)  /'+@Divisor+' UtilidadBruta,'

			set @misql = @misql + ' case when sum(case when Codigoconcepto=63 then ActualTotal else 0 end /'+@Divisor+') = 0 then 0 else'
			set @misql = @misql + ' (sum(case when Codigoconcepto=101 then ActualTotal else 0 end /'+@Divisor+') +'
			set @misql = @misql + ' sum(case when Codigoconcepto=268 then ActualTotal else 0 end /'+@Divisor+') +'
			set @misql = @misql + ' sum(case when Codigoconcepto=252 then ActualTotal*(-1) else 0 end /'+@Divisor+')) /'

			set @misql = @misql + ' sum(case when Codigoconcepto=63 then ActualTotal else 0 end /'+@Divisor+') '
			set @misql = @misql + ' end Eficiencia,'

			set @misql = @misql + ' case when sum(case when Codigoconcepto=63 then ActualTotal else 0 end /'+@Divisor+') = 0 then 0 else'
			set @misql = @misql + ' (sum(case when Codigoconcepto=101 then ActualTotal else 0 end /'+@Divisor+') +'
			set @misql = @misql + ' sum(case when Codigoconcepto=268 then ActualTotal else 0 end /'+@Divisor+')) / '
			set @misql = @misql + ' sum(case when Codigoconcepto=63 then ActualTotal else 0 end /'+@Divisor+') '

			set @misql = @misql + ' end EficienciaSinGAC,'
			set @misql = @misql + ' 0 Orden from ('
			set @misql = @misql + ' select distinct t2.NombrePresentacion,t2.CodigoPresentacion,t3.CodigoSede,t4.NombreSede ,NombreMes,Mes,t3.Orden  '
			set @misql = @misql + ' from informesMeses t1,InformesPresentaciones t2,InformesPresentacionesSedes t3,InformesSedes t4  '
			set @misql = @misql + ' where t2.CodigoPresentacion = '+cast(@CodigoPresentacion as char(2))+' and t2.CodigoPresentacion = t3.CodigoPresentacion and t3.CodigoSede = t4.CodigoSede ) C '
			set @misql = @misql + ' left join informesDefinitivos A on  MesFinal1 <> MesFinal2 and balance= '+cast(@Balance as char(2))+' and a.año2 = '+cast(@Año as char(4))+' and Codigoconcepto in (101,268,252,63,1) '
			set @misql = @misql + ' 								and C.Mes=A.MesFinal2 and C.CodigoPresentacion=A.CodigoPresentacion and A.SedeTotal = ''Total'' '
			set @misql = @misql + ' 								where C.Orden = 1'
			set @misql = @misql + ' group by C.CodigoPresentacion,c.NombreMes,NombrePresentacion,a.año2,C.Mes,a.SedeTotal,C.Orden '
		End
		if @i >= 1 
		Begin
			set @misql = @misql + ' Union '
		end

		set @misql = @misql + ' select C.CodigoPresentacion,c.NombrePresentacion,'+cast(@Año as char(4))+' Año,C.Mes,C.NombreMes,c.NombreSede Sede, '
		set @misql = @misql + ' 	sum(case when Codigoconcepto=101 then Actual'+@c+' else 0 end) /'+@Divisor+' GastosdeOperacion, '
		set @misql = @misql + ' 	sum(case when Codigoconcepto=268 then Actual'+@c+' else 0 end) /'+@Divisor+' GMC, '
		set @misql = @misql + ' 	sum(case when Codigoconcepto=252 then Actual'+@c+'*(-1) else 0 end) /'+@Divisor+' GAC, '
		set @misql = @misql + ' 	sum(case when Codigoconcepto=63 then Actual'+@c+' else 0 end)  /'+@Divisor+' UtilidadBruta,	 '

		set @misql = @misql + ' 	case when sum(case when Codigoconcepto=63 then Actual'+@c+' else 0 end /'+@Divisor+') = 0 then 0 else '
		set @misql = @misql + ' 	(sum(case when Codigoconcepto=101 then Actual'+@c+' else 0 end /'+@Divisor+') + '
		set @misql = @misql + ' 	sum(case when Codigoconcepto=268 then Actual'+@c+' else 0 end /'+@Divisor+') + '
		set @misql = @misql + ' 	sum(case when Codigoconcepto=252 then Actual'+@c+'*(-1) else 0 end /'+@Divisor+')) / '
		set @misql = @misql + ' 	sum(case when Codigoconcepto=63 then Actual'+@c+' else 0 end /'+@Divisor+')'

		set @misql = @misql + ' 	end Eficiencia, '
		set @misql = @misql + ' 	case when sum(case when Codigoconcepto=63 then Actual'+@c+' else 0 end /'+@Divisor+') = 0 then 0 else '
		set @misql = @misql + ' 	(sum(case when Codigoconcepto=101 then Actual'+@c+' else 0 end /'+@Divisor+') + '
		set @misql = @misql + ' 	sum(case when Codigoconcepto=268 then Actual'+@c+' else 0 end /'+@Divisor+')) /  '
		set @misql = @misql + ' 	sum(case when Codigoconcepto=63 then Actual'+@c+' else 0 end /'+@Divisor+')  '

		set @misql = @misql + ' 	end EficienciaSinGAC,c.Orden '
		set @misql = @misql + ' from (	select distinct t2.NombrePresentacion,t2.CodigoPresentacion,t3.CodigoSede,t4.NombreSede ,NombreMes,Mes,t3.Orden   '
		set @misql = @misql + ' 	from informesMeses t1,InformesPresentaciones t2,InformesPresentacionesSedes t3,InformesSedes t4   '
		set @misql = @misql + ' 	where t2.CodigoPresentacion = '+cast(@CodigoPresentacion as char(2))+' and t2.CodigoPresentacion = t3.CodigoPresentacion and t3.CodigoSede = t4.CodigoSede ) C  '
		set @misql = @misql + '		left join informesDefinitivos A on  MesFinal1 <> MesFinal2 and balance= '+cast(@Balance as char(2))+' and a.año2 = '+cast(@Año as char(4))+' and Codigoconcepto in (101,268,252,63,1)  '
		set @misql = @misql + ' 	and C.Mes=A.MesFinal2 and C.CodigoPresentacion=A.CodigoPresentacion and A.Sede'+@c+' = c.NombreSede  '
		set @misql = @misql + ' group by C.CodigoPresentacion,c.NombreMes,NombrePresentacion,a.año2,C.Mes,c.NombreSede,C.Orden '


		set @i = @i + 1
	end


	IF OBJECT_ID (N'dbo.InformesIndEficienciaAdministrativa_v2', N'U') IS NULL Begin
		set @misql2 = 'Select CodigoPresentacion,NombrePresentacion,Año,Mes,NombreMes,Sede,sum(GastosdeOperacion)GastosdeOperacion,sum(GMC)GMC,sum(GAC)GAC,sum(UtilidadBruta)UtilidadBruta,sum(Eficiencia)Eficiencia,Orden,sum(EficienciaSinGac)EficienciaSinGac '     
		set @misql2 = @misql2 + ' into InformesIndEficienciaAdministrativa_v2 from (' + @misql + ') as Datos '
		set @misql2 = @misql2 + ' group by CodigoPresentacion,NombrePresentacion,Año,Mes,NombreMes,Sede,Orden '
	End
	Else Begin
		set @misql2 = ' insert into InformesIndEficienciaAdministrativa_v2  '
		set @misql2 = @misql2 + 'Select CodigoPresentacion,NombrePresentacion,Año,Mes,NombreMes,Sede,sum(GastosdeOperacion)GastosdeOperacion,sum(GMC)GMC,sum(GAC)GAC,sum(UtilidadBruta)UtilidadBruta,sum(Eficiencia)Eficiencia,Orden,sum(EficienciaSinGac)EficienciaSinGac,getdate() '     
		set @misql2 = @misql2 + ' from (' + @misql + ') as Datos '
		set @misql2 = @misql2 + ' group by CodigoPresentacion,NombrePresentacion,Año,Mes,NombreMes,Sede,Orden '
	End
	
	--print @misql
	exec (@misql2)
END



```
