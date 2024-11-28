# Stored Procedure: sp_InformesDatosSede

## Usa los objetos:
- [[InformesArboles]]
- [[InformesCentros]]
- [[InformesDatosArbol]]
- [[InformesDatosContables]]
- [[InformesDatosPresentaciones]]
- [[InformesDatosPresupuesto]]
- [[InformesDatosPresupuestoDigital]]
- [[InformesPresentaciones]]
- [[InformesPresentacionesSedes]]
- [[InformesSedes]]
- [[InformesSedesCentros]]
- [[sp_InformesPorcentaje]]
- [[sp_InformesSignos]]
- [[sp_InformesSumas]]
- [[sp_InformesSumas2020]]
- [[sp_InformesTotales]]
- [[vw_InformesConfiguracionPresentaciones]]

```sql

-- =============================================
-- Author:		Freddy Guerrero 
-- Create date: 2018
-- Description:	Se asegura de realizar todas las sumas de las presenaciones, generales y particulares
-- 2020-02-10 Se crea nueva version de sumas por actualizacion de presupuesto con detalles y totales
-- 2020-02-17 Se filtran mas marcas a la presentacion de agricola
-- =============================================

CREATE PROCEDURE [dbo].[sp_InformesDatosSede] -- Por Presentacion con totales
	-- Add the parameters for the stored procedure here
@Presentacion as int,
@CodigoSede as int,
@AñoAnterior as int,
@MesAnteriorInicial as int,
@MesAnterior as int,
@AñoActual as int,
@MesActualInicial as int,
@MesActual as int,
@Arbol as smallint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @CodError as smallint
	DECLARE @NomSede as nvarchar(100)
	DECLARE @CentroPresupuesto as smallint
	DECLARE @DepartamentoPresupuesto as nvarchar(2)
	DECLARE @NombreTablaTemporal as nvarchar(100)
	DECLARE @ArbolPresupuesto AS int
	DECLARE @Diferencia AS BIT = 0
	DECLARE @EmpresaPresupuesto AS smallint = 0


	if exists(select * from InformesPresentaciones where ArbolBalance=@Arbol)
        if @AñoActual <= 2018   
            set @ArbolPresupuesto = 11
        else
			set @ArbolPresupuesto = 18
	else
		begin
			if  @Presentacion = 11 -- Bonaparte
				set @ArbolPresupuesto = @Arbol -- 19
			else
				set @ArbolPresupuesto = @Arbol
		end 
	set @CodError = 0 

	-- Se trae informacion de la Sede
	select @NomSede=NombreSede,@Diferencia = Diferencia from InformesSedes where CodigoSede = @CodigoSede 


	if @CodError <= 0
	BEGIN 
		
		IF @presentacion not in (18,44) BEGIN
			
			-- Insert statements for procedure here
			insert into #TablaTemporal1

			Select @Presentacion,@AñoAnterior,@MesAnteriorInicial,@MesAnterior,@AñoActual,@MesActualInicial,@MesActual,a.Orden,a.Balance,a.CodigoConcepto,a.NombreConcepto,@CodigoSede CodigoSede,@NomSede Sede,A.Saldo Anterior,000 as AntProcentaje,b.Saldo Actual,000 as ActProcentaje,isnull(Presupuesto,0) Presupuesto,000 as PreProcentaje,a.Nivel1,a.nivel2,a.nivel3,a.Nivel4,a.Nivel5,a.Nivel6,a.DebeHaber
		
			from 
			(

				select rank() OVER (ORDER BY Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6) as Orden,t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,
							sum(isnull(t3.Saldo,0)) Saldo,isnull(t1.DebeHaber,'') DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6,t1.ConceptoPresupuesto
				from InformesArboles t1 
							left join InformesDatosArbol t2 ON t1.CodigoConcepto =t2.CodigoConcepto and t1.Balance = t2.Balance and t1.Empresa =t2.Empresa
							left join InformesDatosPresentaciones t3 ON t2.Cuenta = t3.Cuenta and t3.Año=@AñoAnterior and t3.Mes >= @MesAnteriorInicial and t3.Mes <= @MesAnterior and t3.CodigoSede = @CodigoSede
				where t1.Balance = @Arbol AND t1.Nivel1 > 0
				group by t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,t1.DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6,t1.ConceptoPresupuesto

			) a left join

			(

				select rank() OVER (ORDER BY Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6) as Orden,t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,						
							sum(isnull(t3.Saldo,0)) Saldo,isnull(t1.DebeHaber,'') DebeHaber
				from InformesArboles t1 
							left join InformesDatosArbol t2 ON t1.CodigoConcepto =t2.CodigoConcepto and t1.Balance = t2.Balance and t1.Empresa =t2.Empresa 
							left join InformesDatosPresentaciones t3 ON t2.Cuenta = t3.Cuenta and t3.Año=@AñoActual  and t3.Mes >= @MesActualInicial and t3.Mes <= @MesActual and t3.CodigoSede = @CodigoSede 
				where t1.Balance = @Arbol AND t1.Nivel1 > 0 
				group by t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,t1.DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6

			) b  ON a.Orden = b.Orden left join
			(

				select sum(isnull(importe,0)) Presupuesto,PkFkBalanceConceptos 
				from
				(select PkFkEmpresas,PkFkCentros,PkFkBalances,PkFkBalanceConceptos,PkBCPAño,PkBCOMes,Importe,PkFkDepartamentos from InformesDatosPresupuesto 
				 union
				 select PkFkEmpresas,PkFkCentros,PkFkBalances,PkFkBalanceConceptos,PkBCPAño,PkBCOMes,Importe,PkFkDepartamentos from InformesDatosPresupuestoDigital) t1 left join 
				InformesCentros t2 on t1.PkFkCentros = t2.CodigoCentro and t1.PkFkEmpresas = t2.EmpresaPresupuesto left join
				InformesSedesCentros t3 on t2.CentroID = t3.CentroID 
				where PkFkBalances = @ArbolPresupuesto 
				and PkBCPAño =  @AñoActual  
				--and ((@ArbolPresupuesto <> 11 and PkBCOMes >= @MesActualInicial) or (@ArbolPresupuesto = 11 and PkBCOMes >= @MesActual)) 
				and ((@ArbolPresupuesto not in (11,18) and PkBCOMes >= @MesActualInicial) or (@ArbolPresupuesto in (11,18) and PkBCOMes >= @MesActual))
				and PkBCOMes <= @MesActual 
				and PkFkEmpresas = t2.EmpresaPresupuesto 
				and PkFkDepartamentos = t2.DepartamentoPresupuesto
				and t3.CodigoSede=@CodigoSede
				group by PkFkBalanceConceptos

			) c on c.PkFkBalanceConceptos = a.ConceptoPresupuesto

			order by a.Orden
		END
		ELSE BEGIN

			-- Insert statements for procedure here
			insert into #TablaTemporal1

			Select @Presentacion,@AñoAnterior,@MesAnteriorInicial,@MesAnterior,@AñoActual,@MesActualInicial,@MesActual,a.Orden,a.Balance,a.CodigoConcepto,a.NombreConcepto,@CodigoSede CodigoSede,@NomSede Sede,A.Saldo Anterior,000 as AntProcentaje,b.Saldo Actual,000 as ActProcentaje,isnull(Presupuesto,0) Presupuesto,000 as PreProcentaje,a.Nivel1,a.nivel2,a.nivel3,a.Nivel4,a.Nivel5,a.Nivel6,a.DebeHaber
		
			from 
			(
				
				select rank() OVER (ORDER BY Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6) as Orden,t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,
							sum(isnull(t3.Saldo,0)) Saldo,isnull(t1.DebeHaber,'') DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6,t1.ConceptoPresupuesto
				from InformesArboles t1 
							left join InformesDatosArbol t2 ON t1.CodigoConcepto =t2.CodigoConcepto and t1.Balance = t2.Balance and t1.Empresa =t2.Empresa 
							left join InformesDatosPresentaciones t3 ON t2.Cuenta = t3.Cuenta and t3.Año=@AñoAnterior and t3.Mes >= @MesAnteriorInicial and t3.Mes <= @MesAnterior and t3.CodigoSede = @CodigoSede and (t3.codigoMarca not in  (SELECT CodigoMarca
																																																							  FROM vw_InformesConfiguracionPresentaciones
																																																							  where CodigoPresentacion = 2 and CodigoMarca <> 0
																																																							  Group By CodigoMarca) or t3.codigoMarca is null)
				where t1.Balance = @Arbol  AND t1.Nivel1 > 0 
				group by t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,t1.DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6,t1.ConceptoPresupuesto
				
			) a left join

			(

				select rank() OVER (ORDER BY Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6) as Orden,t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,						
							sum(isnull(t3.Saldo,0)) Saldo,isnull(t1.DebeHaber,'') DebeHaber
				from InformesArboles t1 
							left join InformesDatosArbol t2 ON t1.CodigoConcepto =t2.CodigoConcepto and t1.Balance = t2.Balance and t1.Empresa =t2.Empresa 
							left join InformesDatosPresentaciones t3 ON t2.Cuenta = t3.Cuenta and t3.Año=@AñoActual  and t3.Mes >= @MesActualInicial and t3.Mes <= @MesActual and t3.CodigoSede = @CodigoSede and (t3.codigoMarca not in  (SELECT CodigoMarca
																																																							  FROM vw_InformesConfiguracionPresentaciones
																																																							  where CodigoPresentacion = 2 and CodigoMarca <> 0
																																																							  Group By CodigoMarca) or t3.codigoMarca is null) 
				where t1.Balance = @Arbol  AND t1.Nivel1 > 0 
				group by t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,t1.DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6

			) b  ON a.Orden = b.Orden left join
			(

				select sum(isnull(importe,0)) Presupuesto,PkFkBalanceConceptos 
				from 
				
				(select PkFkEmpresas,PkFkCentros,PkFkBalances,PkFkBalanceConceptos,PkBCPAño,PkBCOMes,Importe,PkFkDepartamentos from InformesDatosPresupuesto 
				 union
				 select PkFkEmpresas,PkFkCentros,PkFkBalances,PkFkBalanceConceptos,PkBCPAño,PkBCOMes,Importe,PkFkDepartamentos from InformesDatosPresupuestoDigital) t1 left join 
				InformesCentros t2 on t1.PkFkCentros = t2.CodigoCentro and t1.PkFkEmpresas = t2.EmpresaPresupuesto left join
				InformesSedesCentros t3 on t2.CentroID = t3.CentroID 
				where PkFkBalances = @ArbolPresupuesto 
				and PkBCPAño =  @AñoActual  
				--and ((@ArbolPresupuesto <> 11 and PkBCOMes >= @MesActualInicial) or (@ArbolPresupuesto = 11 and PkBCOMes >= @MesActual)) 
				and ((@ArbolPresupuesto not in (11,18) and PkBCOMes >= @MesActualInicial) or (@ArbolPresupuesto in (11,18) and PkBCOMes >= @MesActual))
				and PkBCOMes <= @MesActual 
				and PkFkEmpresas = t2.EmpresaPresupuesto 
				and PkFkDepartamentos in ('VO')
				and t3.CodigoSede=@CodigoSede
				group by PkFkBalanceConceptos


			) c on c.PkFkBalanceConceptos = a.ConceptoPresupuesto

			order by a.Orden

		END
	END

--GANACIAS DEL EJERCICIO QUE SE TRAEN DEL P&G

	if @Arbol = 18 AND @Presentacion not in (19,20,21)
	BEGIN

		DECLARE @GananciaAnterior as decimal(38,4)
		DECLARE @GananciaActual as decimal(38,4)

		if @AñoAnterior = @AñoActual BEGIN

			--Utilidad Mensual
			SELECT @GananciaAnterior=sum(Saldo) 
			FROM InformesDatosContables
			where mes between @MesAnterior and @MesAnterior and año = @AñoActual 
			and (Cuenta like '4%' or Cuenta like '5%' or Cuenta like '6%') 
			and empresa in (select distinct Empresa 
							from InformesPresentacionesSedes t1	left join 
								 InformesSedesCentros t2 on t1.CodigoSede = t2.CodigoSede left join
								 InformesCentros t3 on t2.CentroID = t3.CentroID 
							where CodigoPresentacion = @Presentacion) 
			and Centro = @CentroPresupuesto


			SELECT @GananciaActual=sum(Saldo)
			FROM InformesDatosContables
			where mes between 1 and @MesActual and año = @AñoActual 
			and (Cuenta like '4%' or Cuenta like '5%' or Cuenta like '6%') 
			and empresa in (select distinct Empresa 
							from InformesPresentacionesSedes t1	left join 
								 InformesSedesCentros t2 on t1.CodigoSede = t2.CodigoSede left join
								 InformesCentros t3 on t2.CentroID = t3.CentroID 
							where CodigoPresentacion = @Presentacion) 
			and Centro = @CentroPresupuesto
		END
		ELSE BEGIN

			--Utilidad Acumulada
			SELECT @GananciaAnterior = sum(Saldo) 
			FROM InformesDatosContables
			where mes between 1 and @MesActual and año = @AñoAnterior 
			and (Cuenta like '4%' or Cuenta like '5%' or Cuenta like '6%') 
			and empresa in (select distinct Empresa 
							from InformesPresentacionesSedes t1	left join 
								 InformesSedesCentros t2 on t1.CodigoSede = t2.CodigoSede left join
								 InformesCentros t3 on t2.CentroID = t3.CentroID 
							where CodigoPresentacion = @Presentacion)  
			and Centro = @CentroPresupuesto

			SELECT @GananciaActual = sum(Saldo)
			FROM InformesDatosContables
			where mes between 1 and @MesActual and año = @AñoActual 
			and (Cuenta like '4%' or Cuenta like '5%' or Cuenta like '6%') 
			and empresa in (select distinct Empresa 
							from InformesPresentacionesSedes t1	left join 
								 InformesSedesCentros t2 on t1.CodigoSede = t2.CodigoSede left join
								 InformesCentros t3 on t2.CentroID = t3.CentroID 
							where CodigoPresentacion = @Presentacion) 
			and Centro = @CentroPresupuesto

		END

		UPDATE #TablaTemporal1 SET Anterior = isnull(@GananciaAnterior,0), Actual = isnull(@GananciaActual,0) where CodigoConcepto = 86
	END

-- VALORES QUE SE MUESTRAN EN ADMINISTRACION Y SE ELIMINAN DE LAS DEMAS PRESENTACIONES

	if @Arbol = 18 AND @Presentacion not in (13,15,30,32,75,78,79,80,81)
	BEGIN

		UPDATE #TablaTemporal1 
		SET Anterior = 0,AntPorcentaje = 0,Actual = 0,ActPorcentaje = 0,Presupuesto = 0,PrePorcentaje = 0
		WHERE CodigoConcepto IN (4,5,6,90,91)

	END

-- CARTERA BALANCE

	--if @Arbol = 18
	--BEGIN
	--	exec sp_InformesSedeCartera @CodigoSede,@AñoActual,@MesActual
	--END

-- BORRA BALANCE

	IF @Arbol = 18 AND (@Presentacion = 2 OR @Presentacion = 18)
	BEGIN
		UPDATE #TablaTemporal1 set anterior = 0,actual = 0, presupuesto = 0
	END

-- VERIFICACION DE SIGNOS

	exec sp_InformesSignos @Arbol

-- SUMATORIAS 

	--exec sp_InformesSumas @Arbol
	
	if @AñoActual < 2020
		exec sp_InformesSumas @Arbol
	else
		exec sp_InformesSumas2020 @Arbol

-- SUMATORIA TOTAL DE CENTROS

	EXEC sp_InformesTotales

-- PORCENTAJES 

	exec sp_InformesPorcentaje @Arbol

END



```
