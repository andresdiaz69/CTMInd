# Stored Procedure: sp_InformesIndAbsorcionPosventaAnualSedes_v2

## Usa los objetos:
- [[informesIndAbsorcionPosventa_v2]]
- [[InformesMeses]]
- [[InformesPresentaciones]]
- [[InformesPresentacionesSedes]]
- [[InformesSedes]]

```sql


-- =============================================
-- Author:		Freddy Guerrero
-- Create date: 2019-02-25
-- Description:	Calcula el indicador de Absorcion Posventa por Sedes
---- =============================================
CREATE PROCEDURE [dbo].[sp_InformesIndAbsorcionPosventaAnualSedes_v2]
	-- Add the parameters for the stored procedure here
	@CodigoPresentacion as smallint, --Presentaciones Posventa,
	@Año as int,
	@Detalle as bit = 0

AS
BEGIN
	SET NOCOUNT ON -- added to prevent extra result sets from

	--SET FMTONLY ON 



	declare @NombreInforme as varchar(50)
	declare @CodigoPresentacionTotal as smallint

	set @NombreInforme = 'AnualLinea'
	
	--declare @CodigoPresentacion as smallint = 18
	--declare @Año as int = 2018

	select top 1 @CodigoPresentacionTotal=PresentacionPrincipal from InformesPresentaciones where CodigoPresentacion = @CodigoPresentacion

	--declare @Año as smallint,@CodigoPresentacion as smallint
	declare @Balance as smallint,@ntiendas as smallint,@i as smallint,@j as smallint,@c as char(2),@misql as varchar(MAX)
	-- Conceptos
	declare @Utilidad_posventa as char(3) = '63'
	--Gts_Variables_Posventa 102-125-(131*1.45)
	declare @Gastos_Ventas as char(3) = '102'
	declare @Gastos_Personal as char(3) = '125'
	declare @Comisiones as char(3) = '131'
	--Gts_fijos_personal 125-131*1.45-136-135(Total)
	declare @Bonificaciones as char(3) = '136'
	declare @Incentivos as char(3) = '135'
	--Gts_Generales
	declare @Gts_Generales as char(3) = '148'
	--GAC(*-1)+GMC
	declare @GAC as char(3) = '266'
	declare @GMC as char(3) = '268'
 
	--set @Año = 2018
	--set @CodigoPresentacion = 8
	set @Balance = 17
	set @j = 1
	set @i = 1
	set @misql = ''

	select @ntiendas = count(*)
	from informesPresentaciones t1 
		left join InformesPresentacionesSedes t2 on t1.CodigoPresentacion =t2.CodigoPresentacion
		left join InformesSedes t3 on t2.CodigoSede = t3.CodigoSede 	
	where t1.CodigoPresentacion=@CodigoPresentacion and t2.Orden <> 0

	if @ntiendas > 0 
	begin

		-- Cuando sea la presentacion de Fabrica colision solo debe traer el centro Fabrica colision por que los demas
		-- ya estan dentro de cada marca
		if @CodigoPresentacion = 28 
		begin
			set @i = 12
			set @ntiendas = 12
		end


		IF OBJECT_ID (N'dbo.informesIndAbsorcionPosventa_v2', N'U') IS NOT NULL
		BEGIN
			delete from informesIndAbsorcionPosventa_v2 where NombreInforme = @NombreInforme and CodigoPresentacion = @CodigoPresentacion and Año = @Año 
			set @misql = @misql + ' insert into informesIndAbsorcionPosventa_v2 (NombreInforme,Empresa,CodigoPresentacion,NombrePresentacion,Año,Mes_Trimestre,Sede,Utilidad_posventa,Gts_Variables,GtsFijosPersonalSucursal,Gts_Generales,GAC,AbsorcionPosventa) '
		END
 
		if @Detalle = 1
		begin
			set @misql = @misql + ' Select '''+@NombreInforme+''' NombreInforme,Empresa,'+cast(@CodigoPresentacion as char(3))+' CodigoPresentacion, NombrePresentacion,Año,Mes_Trimestre,Sede,Utilidad_posventa,'
			set @misql = @misql + ' Gastos_Ventas,Gastos_Personal,Comisiones,Gastos_Ventas+(Gastos_Personal-Comisiones) Gts_Variables,'
			set @misql = @misql + ' Bonificaciones,Incentivos,(Gastos_Personal-Comisiones-Bonificaciones-Incentivos) GtsFijosPersonalSucursal,'
			set @misql = @misql + ' Gastos_Generales Gts_Generales,'
			set @misql = @misql + ' GAC GAC_Total,GMC GMC_Total, GAC+GMC GAC,'
			set @misql = @misql + ' case when ((Gastos_Personal-Comisiones-Bonificaciones-Incentivos) + Gastos_Generales+GAC+GMC) = 0 then 0 else '
			set @misql = @misql + ' (Utilidad_posventa-(Gastos_Ventas+(Gastos_Personal-Comisiones)))/((Gastos_Personal-Comisiones-Bonificaciones-Incentivos) + Gastos_Generales+GAC+GMC) end AbsorcionPosventa '
		end
		else
		begin
			set @misql = @misql + ' Select '''+@NombreInforme+''' NombreInforme,Empresa,'+cast(@CodigoPresentacion as char(3))+' CodigoPresentacion,'
			set @misql = @misql + ' NombrePresentacion,Año,Mes_Trimestre,Sede,Utilidad_posventa,'
			set @misql = @misql + ' Gastos_Ventas+(Gastos_Personal-Comisiones) Gts_Variables,'
			set @misql = @misql + ' (Gastos_Personal-Comisiones-Bonificaciones-Incentivos) GtsFijosPersonalSucursal,'
			set @misql = @misql + ' Gastos_Generales Gts_Generales,'
			set @misql = @misql + ' GAC+GMC GAC,'
			set @misql = @misql + ' case when ((Gastos_Personal-Comisiones-Bonificaciones-Incentivos) + Gastos_Generales+GAC+GMC) = 0 then 0 else '
			set @misql = @misql + ' (Utilidad_posventa-(Gastos_Ventas+(Gastos_Personal-Comisiones)))/((Gastos_Personal-Comisiones-Bonificaciones-Incentivos) + Gastos_Generales+GAC+GMC) end AbsorcionPosventa '
		end

		IF OBJECT_ID (N'dbo.informesIndAbsorcionPosventa_v2', N'U') IS NULL
		BEGIN
			set @misql = @misql + ' into informesIndAbsorcionPosventa_v2 ' 
		END

		set @misql = @misql + ' from ('

		while @i <= @ntiendas
		Begin
			set @c = ltrim(rtrim(str(@i)))
			if @j > 1
				set @misql = @misql + ' Union '

			set @misql = @misql + ' select b.EmpresaPrincipal Empresa,NombrePresentacion,a.año2 Año,a.MesFinal2 Mes_Trimestre,Sede'+@c+' Sede,'
			--Utilidad_posventa
			set @misql = @misql + ' sum(case when Codigoconcepto='+@Utilidad_posventa		+' then Actual'+@c+' else 0 end) Utilidad_posventa,'
			--Gts_Variables_Posventa
			set @misql = @misql + ' sum(case when Codigoconcepto='+@Gastos_Ventas			+' then Actual'+@c+' else 0 end) Gastos_Ventas,'
			set @misql = @misql + ' sum(case when Codigoconcepto='+@Gastos_Personal			+' then Actual'+@c+' else 0 end) Gastos_Personal,'
			set @misql = @misql + ' sum(case when Codigoconcepto='+@Comisiones				+' then Actual'+@c+' else 0 end)*(1.45) Comisiones,'
			--Gts_fijos_personal
			set @misql = @misql + ' sum(case when Codigoconcepto='+@Bonificaciones		+' then Actual'+@c+' else 0 end) Bonificaciones,'
			set @misql = @misql + ' sum(case when Codigoconcepto='+@Incentivos		+' then Actual'+@c+' else 0 end) Incentivos,'

			if @CodigoPresentacion = 54 and @c in (7,11)
			begin
				set @misql = @misql + ' 0 Gastos_Generales,'
				set @misql = @misql + ' 0 GAC,'
				set @misql = @misql + ' 0 GMC'		
			end
			else
			Begin
				--Gts_Generales
				set @misql = @misql + ' (select sum(Actual'+@c+') from informesDefinitivos '
				set @misql = @misql + ' where CodigoPresentacion = '+cast(@CodigoPresentacionTotal as char(3))+' and Codigoconcepto='+@Gts_Generales+' and '
				set @misql = @misql + ' balance= '+cast(@Balance as char(2))
				set @misql = @misql + ' and año2 = '+cast(@Año as char(4))
				set @misql = @misql + ' and MesFinal2 = A.MesFinal2'
				set @misql = @misql + ' and MesFinal1 <> MesFinal2) Gastos_Generales,'
				--GAC
				set @misql = @misql + ' (select sum(Actual'+@c+') from informesDefinitivos '
				set @misql = @misql + ' where CodigoPresentacion = '+cast(@CodigoPresentacionTotal as char(3))+' and Codigoconcepto='+@GAC+' and '
				set @misql = @misql + ' balance= '+cast(@Balance as char(2))
				set @misql = @misql + ' and año2 = '+cast(@Año as char(4))
				set @misql = @misql + ' and MesFinal2 = A.MesFinal2'
				set @misql = @misql + ' and MesFinal1 <> MesFinal2)*(-1) GAC,'
				--GAC
				set @misql = @misql + ' (select sum(Actual'+@c+') from informesDefinitivos '
				set @misql = @misql + ' where CodigoPresentacion = '+cast(@CodigoPresentacionTotal as char(3))+' and Codigoconcepto='+@GMC+' and '
				set @misql = @misql + ' balance= '+cast(@Balance as char(2))
				set @misql = @misql + ' and año2 = '+cast(@Año as char(4))
				set @misql = @misql + ' and MesFinal2 = A.MesFinal2'
				set @misql = @misql + ' and MesFinal1 <> MesFinal2) GMC'		
			end
			set @misql = @misql + ' from informesDefinitivos A left join '
			set @misql = @misql + ' informesPresentaciones B on a.CodigoPresentacion=b.CodigoPresentacion '
			set @misql = @misql + ' where '
			set @misql = @misql + ' balance= '+cast(@Balance as char(2))
			set @misql = @misql + ' and a.año2 = '+cast(@Año as char(4))
			set @misql = @misql + ' and MesFinal1 <> MesFinal2 '
			set @misql = @misql + ' and Codigoconcepto in ('+@Utilidad_posventa+','+@Gastos_Ventas+','+@Gastos_Personal+','+@Comisiones+','+@Bonificaciones+','+@Incentivos+','+@Gts_Generales+','+@GAC+') '
			set @misql = @misql + ' and a.CodigoPresentacion = '+cast(@CodigoPresentacion as char(3))
			set @misql = @misql + ' group by b.EmpresaPrincipal,b.NombrePresentacion,a.año2,a.MesFinal2,a.Sede'+@c 

			set @i = @i + 1
			set @j = @j + 1
		end
		set @misql = @misql + ' ) Consulta'
		set @misql = @misql + ' order by NombrePresentacion,Sede,Mes_Trimestre'

	--	set @misql = @misql + ' ) '


	--	set @misql = @misql + ')'
		exec (@misql)
	
 
			 
	 Insert into informesIndAbsorcionPosventa_v2 (NombreInforme,Empresa,CodigoPresentacion,NombrePresentacion,Año,Mes_Trimestre,Sede,Utilidad_posventa,Gts_Variables,GtsFijosPersonalSucursal,Gts_Generales,GAC,AbsorcionPosventa)
		select NombreInforme,Empresa,CodigoPresentacion,NombrePresentacion,Año,
				Mes Mes_Trimestre,Sede,0 Utilidad_posventa,0 Gts_Variables,0 GtsFijosPersonalSucursal,0 Gts_General,0 GAC,0 AbsorcionPosventa 
		from
			(Select t1.Mes
			from InformesMeses t1 left outer join informesIndAbsorcionPosventa_v2 t2 on Mes = Mes_Trimestre and CodigoPresentacion = @CodigoPresentacion and Año = @Año and NombreInforme =@NombreInforme
			where  Mes_Trimestre is null) A, 
			(Select NombreInforme,Empresa,CodigoPresentacion,NombrePresentacion,Año,Sede
			from informesIndAbsorcionPosventa_v2 
			where CodigoPresentacion = @CodigoPresentacion and Año = @Año and NombreInforme =@NombreInforme
			group by NombreInforme,Empresa,CodigoPresentacion,NombrePresentacion,Año,Sede) B
	end

END

```
