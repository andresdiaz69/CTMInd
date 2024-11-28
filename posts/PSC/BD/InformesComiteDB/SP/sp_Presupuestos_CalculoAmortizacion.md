# Stored Procedure: sp_Presupuestos_CalculoAmortizacion

## Usa los objetos:
- [[spiga_ContabilidadMovimientos_Presupuesto]]
- [[vw_Presupuestos_Lineas]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_CalculoAmortizacion]
	-- =============================================
	-- Control de Cambios
	-- 2024|11|09 - Jhon Hernandez - Creado para Listar las amortizaciones y calcular valores por mes
	-- 2024|11|10 - Alexis Barreto - Se modifica el valor retorno del sp, para devolver en una sola consulta el valor de la obra y software y no por separado
	-- Description:	<SP PARA CALCULO DE Amortizacion PRESUPUESTOS en P&G>
	-- =============================================
    @codlinea int,
    @codcentro int,
    @Anio_Periodo int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
    SET NOCOUNT ON;
    SET FMTONLY OFF;

    DECLARE  
	--@codlinea int=19,
    --@codcentro int=1,
    --@Anio_Periodo int=2025, 
	@codempresa int,
			@mes_periodo int,
            @countObra int = 0,
            @software decimal(18, 2) = 0,
			@count int= 0
    --        @Obra decimal(18, 2) = 0;
	--select *---top 1 @codempresa=  
	----CodEmpresa  
	--from vw_Presupuestos_Lineas
	--where Codigo_Linea= @codlinea


	CREATE TABLE #amortizaciones (anio int,codigolinea int,codigocentro int,mes_periodo int,valorobra decimal (18,2),
	valorsoftware decimal (18,2) )

	Set @mes_periodo= 1

 WHILE @mes_periodo<=12
	
	BEGIN
	   
				INSERT INTO #amortizaciones 
				(anio ,codigolinea,codigocentro,mes_periodo,valorobra,valorsoftware)
 
 
			 select year(a.FechaAsiento),b.Codigo_Linea,a.Centro,Month(a.FechaAsiento) as mes_periodo
			,(SUM(a.debe))as valorobra,'0.00' as valorsoftware
			from PSCService_DB.dbo.[spiga_ContabilidadMovimientos_Presupuesto] as a
			inner join vw_Presupuestos_Lineas as b on a.IdEmpresas = b.CodEmpresa
			where year(a.FechaAsiento)= @Anio_Periodo and Month(a.FechaAsiento)= @mes_periodo
			and a.centro = @codcentro 
			and b.Codigo_Linea = @codlinea
			and a.Cuenta= '5265150805' --obras
			group by year(a.FechaAsiento),b.Codigo_Linea,Centro,Month(FechaAsiento)
 
           select @count= count(*) from #amortizaciones
		   where anio = @Anio_Periodo 
		            AND mes_periodo= @mes_periodo
					and codigolinea = @codlinea
					and codigocentro = @codcentro 
			 

			IF @count >0
			 BEGIN
			-- select @count
					select @software= SUM(a.debe) 
					from PSCService_DB.dbo.[spiga_ContabilidadMovimientos_Presupuesto] as a
					inner join vw_Presupuestos_Lineas as b on a.IdEmpresas = b.CodEmpresa
					where year(FechaAsiento)= @Anio_Periodo and Month(FechaAsiento)= @mes_periodo
					and centro = @codcentro 
					and b.Codigo_Linea = @codlinea
					and Cuenta in ('5265151010','5265151020','5265151030') --Software
					group by year(FechaAsiento),b.Codigo_Linea,Centro,Month(FechaAsiento)
			--select @software
					Update #amortizaciones
					set valorsoftware = @software
					where anio= @Anio_Periodo 
					and mes_periodo= @mes_periodo
					and codigolinea = @codlinea
					and codigocentro = @codcentro 
			 END
			ELSE 
			 BEGIN
			 --select 'hola'
			  
			  
			  INSERT INTO #amortizaciones 
				(anio ,codigolinea,codigocentro,mes_periodo,valorobra,valorsoftware)
				
			  select  year(a.FechaAsiento),b.Codigo_Linea,a.Centro,Month(a.FechaAsiento) as mes_periodo
			,'0.00'  as valorobra,(SUM(a.debe))as valorsoftware
			from PSCService_DB.dbo.[spiga_ContabilidadMovimientos_Presupuesto] as a
			inner join vw_Presupuestos_Lineas as b on a.IdEmpresas = b.CodEmpresa
			where year(a.FechaAsiento)= @Anio_Periodo and Month(a.FechaAsiento)= @mes_periodo
			and a.centro = @codcentro 
			and b.Codigo_Linea = @codlinea
			and Cuenta in ('5265151010','5265151020','5265151030') --Software
			group by  year(a.FechaAsiento),b.Codigo_Linea,Centro,Month(FechaAsiento)


			 END


			SET @mes_periodo = @mes_periodo+1
   
END

SELECT * FROM #amortizaciones

DROP TABLE #amortizaciones

End
```
