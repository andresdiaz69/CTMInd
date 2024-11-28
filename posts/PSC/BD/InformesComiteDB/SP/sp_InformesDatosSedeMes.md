# Stored Procedure: sp_InformesDatosSedeMes

## Usa los objetos:
- [[InformesArboles]]
- [[InformesDatosArbol]]
- [[InformesDatosPresentaciones]]
- [[InformesSedes]]
- [[sp_InformesPorcentaje]]
- [[sp_InformesSignosMes]]
- [[sp_InformesSumasMes]]
- [[sp_InformesTotales]]
- [[vw_InformesConfiguracionPresentaciones]]

```sql


-- =============================================
-- Author:		Freddy Guerrero 
-- Create date: 2018
-- Description:	Generacion de las presenaciones de un solo mes en detalle
-- 2020-02-17 Se filtran mas marcas a la presentacion de agricola
-- =============================================

CREATE PROCEDURE [dbo].[sp_InformesDatosSedeMes] -- Por Presentacion con totales
	-- Add the parameters for the stored procedure here
@Presentacion as int,
@CodigoSede as int,
@Año as int,
@MesInicial as int,
@MesFinal as int,
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

	set @CodError = 0 

	-- Se trae informacion de la Sede
	select @NomSede=NombreSede,@Diferencia = Diferencia from InformesSedes where CodigoSede = @CodigoSede 


	if @CodError <= 0
	BEGIN 
		
		IF @presentacion not in (18,44) BEGIN
			
			-- Insert statements for procedure here
			insert into #TablaTemporal1

			Select @Presentacion,@Año,@MesInicial,@MesFinal,@Año,@MesInicial,@MesFinal,a.Orden,a.Balance,a.CodigoConcepto,a.NombreConcepto,@CodigoSede CodigoSede,@NomSede Sede,isnull(a.Saldo,0) Centro,000 as CenPorcentaje,isnull(b.Saldo,0) Colision,000 as ColPorcentaje,isnull(c.Saldo,0) Fabrica,000 as FabPorcentaje,a.Nivel1,a.nivel2,a.nivel3,a.Nivel4,a.Nivel5,a.Nivel6,a.DebeHaber
		
			from 
			(

				select rank() OVER (ORDER BY Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6) as Orden,t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,
							sum(isnull(t3.Saldo,0)) Saldo,isnull(t1.DebeHaber,'') DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6,t1.ConceptoPresupuesto
				from InformesArboles t1 
							left join InformesDatosArbol t2 ON t1.CodigoConcepto =t2.CodigoConcepto and t1.Balance = t2.Balance and t1.Empresa =t2.Empresa
							left join InformesDatosPresentaciones t3 ON t2.Cuenta = t3.Cuenta and t3.Año=@Año and t3.Mes >= @MesInicial and t3.Mes <= @MesFinal and t3.CodigoSede = @CodigoSede and t3.Tipo in ('Centro','TC')
				where t1.Balance = @Arbol AND t1.Nivel1 > 0 
				group by t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,t1.DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6,t1.ConceptoPresupuesto

			) a left join

			(

				select rank() OVER (ORDER BY Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6) as Orden,t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,						
							sum(isnull(t3.Saldo,0)) Saldo,isnull(t1.DebeHaber,'') DebeHaber
				from InformesArboles t1 
							left join InformesDatosArbol t2 ON t1.CodigoConcepto =t2.CodigoConcepto and t1.Balance = t2.Balance and t1.Empresa =t2.Empresa 
							left join InformesDatosPresentaciones t3 ON t2.Cuenta = t3.Cuenta and t3.Año=@Año and t3.Mes >= @MesInicial and t3.Mes <= @MesFinal and t3.CodigoSede = @CodigoSede and t3.Tipo in ('Colision','TM')
				where t1.Balance = @Arbol AND t1.Nivel1 > 0
				group by t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,t1.DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6

			) b  ON a.Orden = b.Orden left join
			(

				select rank() OVER (ORDER BY Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6) as Orden,t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,						
							sum(isnull(t3.Saldo,0)) Saldo,isnull(t1.DebeHaber,'') DebeHaber
				from InformesArboles t1 
							left join InformesDatosArbol t2 ON t1.CodigoConcepto =t2.CodigoConcepto and t1.Balance = t2.Balance and t1.Empresa =t2.Empresa 
							left join InformesDatosPresentaciones t3 ON t2.Cuenta = t3.Cuenta and t3.Año=@Año  and t3.Mes >= @MesInicial and t3.Mes <= @MesFinal and t3.CodigoSede = @CodigoSede and t3.Tipo in ('Fabrica','RE')
				where t1.Balance = @Arbol AND t1.Nivel1 > 0
				group by t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,t1.DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6


			) c ON a.Orden = c.Orden 

			order by a.Orden
		END
		ELSE BEGIN

			-- Insert statements for procedure here
			insert into #TablaTemporal1

			Select @Presentacion,@Año,@MesInicial,@MesFinal,@Año,@MesInicial,@MesFinal,a.Orden,a.Balance,a.CodigoConcepto,a.NombreConcepto,@CodigoSede CodigoSede,@NomSede Sede,isnull(A.Saldo,0) Centro,000 as CenPorcentaje,isnull(b.Saldo,0) Colision,000 as ColPorcentaje,isnull(c.Saldo,0) Fabrica,000 as FabPorcentaje,a.Nivel1,a.nivel2,a.nivel3,a.Nivel4,a.Nivel5,a.Nivel6,a.DebeHaber
		
			from 
			(
				
				select rank() OVER (ORDER BY Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6) as Orden,t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,
							sum(isnull(t3.Saldo,0)) Saldo,isnull(t1.DebeHaber,'') DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6,t1.ConceptoPresupuesto
				from InformesArboles t1 
							left join InformesDatosArbol t2 ON t1.CodigoConcepto =t2.CodigoConcepto and t1.Balance = t2.Balance and t1.Empresa =t2.Empresa 
							left join InformesDatosPresentaciones t3 ON t2.Cuenta = t3.Cuenta and t3.Año=@Año and t3.Mes >= @MesInicial and t3.Mes <= @MesFinal and t3.CodigoSede = @CodigoSede and (t3.codigoMarca not in  (SELECT CodigoMarca
																																																							  FROM vw_InformesConfiguracionPresentaciones
																																																							  where CodigoPresentacion = 2 and CodigoMarca <> 0
																																																							  Group By CodigoMarca) or t3.codigoMarca is null) and t3.Tipo in ('Centro','TC')
				where t1.Balance = @Arbol AND t1.Nivel1 > 0
				group by t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,t1.DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6,t1.ConceptoPresupuesto
				
			) a left join

			(

				select rank() OVER (ORDER BY Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6) as Orden,t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,						
							sum(isnull(t3.Saldo,0)) Saldo,isnull(t1.DebeHaber,'') DebeHaber
				from InformesArboles t1 
							left join InformesDatosArbol t2 ON t1.CodigoConcepto =t2.CodigoConcepto and t1.Balance = t2.Balance and t1.Empresa =t2.Empresa 
							left join InformesDatosPresentaciones t3 ON t2.Cuenta = t3.Cuenta and t3.Año=@Año and t3.Mes >= @MesInicial and t3.Mes <= @MesFinal and t3.CodigoSede = @CodigoSede and (t3.codigoMarca not in  (SELECT CodigoMarca
																																																							  FROM vw_InformesConfiguracionPresentaciones
																																																							  where CodigoPresentacion = 2 and CodigoMarca <> 0
																																																							  Group By CodigoMarca) or t3.codigoMarca is null) and t3.Tipo in ('Colision','TM')
				where t1.Balance = @Arbol AND t1.Nivel1 > 0
				group by t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,t1.DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6

			) b  ON a.Orden = b.Orden left join
			(

				select rank() OVER (ORDER BY Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6) as Orden,t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,						
							sum(isnull(t3.Saldo,0)) Saldo,isnull(t1.DebeHaber,'') DebeHaber
				from InformesArboles t1 
							left join InformesDatosArbol t2 ON t1.CodigoConcepto =t2.CodigoConcepto and t1.Balance = t2.Balance and t1.Empresa =t2.Empresa 
							left join InformesDatosPresentaciones t3 ON t2.Cuenta = t3.Cuenta and t3.Año=@Año and t3.Mes >= @MesInicial and t3.Mes <= @MesFinal and t3.CodigoSede = @CodigoSede and (t3.codigoMarca not in  (SELECT CodigoMarca
																																																							  FROM vw_InformesConfiguracionPresentaciones
																																																							  where CodigoPresentacion = 2 and CodigoMarca <> 0
																																																							  Group By CodigoMarca) or t3.codigoMarca is null) and t3.Tipo in ('Fabrica','RE')
				where t1.Balance = @Arbol AND t1.Nivel1 > 0
				group by t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,t1.DebeHaber,Nivel1,nivel2,nivel3,Nivel4,Nivel5,Nivel6



			) c ON a.Orden = c.Orden 

			order by a.Orden

		END
	END



-- VERIFICACION DE SIGNOS

	exec sp_InformesSignosMes @Arbol

-- SUMATORIAS 

	exec sp_InformesSumasMes @Arbol

--CENTRO DIFERENCIA

	--IF @Diferencia = 1 BEGIN
  
	--	exec sp_InformesDiferencia @Arbol

	--END	

-- SUMATORIA TOTAL DE CENTROS

	EXEC sp_InformesTotales

-- PORCENTAJES 

	exec sp_InformesPorcentaje @Arbol

END




```
