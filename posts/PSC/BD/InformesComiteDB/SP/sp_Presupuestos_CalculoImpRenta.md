# Stored Procedure: sp_Presupuestos_CalculoImpRenta

## Usa los objetos:
- [[Presupuestos_Definitivos]]
- [[Presupuestos_VariablesParametrizacionesGlobales]]

```sql
-- =============================================
-- Author:		Jhon Carlos Hernandez Giron
--<Create Date> 2024/11/15
-- Description:	Calculo del Impuesto de Renta
-- =============================================
CREATE PROCEDURE sp_Presupuestos_CalculoImpRenta
	-- Add the parameters for the stored procedure here
	@codlinea int,
    @codcentro int,
    @Anio_Periodo int,
	@idclase int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
Declare @periodo int,
@Porcentaje_imp decimal (18,2)=0,
@IdTipo int = 172,
@idjerarquia int = 330,
@periodoant int =0,
@valoracumulado decimal (18,2) =0,
@impuestoant  decimal (18,2),
@Valor  decimal (18,2)
Set @periodo = 1

select @Porcentaje_imp =(Valor/100) from Presupuestos_VariablesParametrizacionesGlobales
where IdTipo= @IdTipo and Ano_Periodo= @Anio_Periodo
--select @Porcentaje_imp


Create table #temp(ano_periodo int,Mes_Periodo int,CodigoLinea int,CodigoCentro int,
valor_RESULTADONETOTOTAL decimal(18,2),Acumulado_RESULTADONETOTOTAL decimal(18,2), Impuesto decimal(18,2))

insert into #temp
			select ano_periodo,Mes_Periodo,CodigoLinea,CodigoCentro,valor,0 as Acumulado_RESULTADONETOTOTAL,0 as Impuesto
			from Presupuestos_Definitivos
			where IdJerarquia = @idjerarquia and CodigoLinea= @codlinea and CodigoCentro =@codcentro
			and IdClase=@idclase 

			
While @periodo <= 12 
	
	BEGIN
	
	 
	 If @periodo = 1
		BEGIN  
		  update #temp
				Set Acumulado_RESULTADONETOTOTAL=(valor_RESULTADONETOTOTAL)
				where Mes_Periodo= @periodo and CodigoLinea= @codlinea and CodigoCentro =@codcentro
				
				set @periodo= @periodo+1
				Set @periodoant=@periodoant +1
         End
     Else IF @periodo <> 1 AND @periodoant<@periodo
		Begin
		 
		-- select @periodo as p1,@periodoant as pa2

				select @valoracumulado = convert(decimal(18,2),Acumulado_RESULTADONETOTOTAL)
				from #temp
				where CodigoLinea= @codlinea and CodigoCentro =1 and Mes_Periodo= @periodoant

				update #temp
				Set Acumulado_RESULTADONETOTOTAL=(valor_RESULTADONETOTOTAL+@valoracumulado)
				where Mes_Periodo= @periodo and CodigoLinea= @codlinea and CodigoCentro =@codcentro

				set @valoracumulado = 0
				set @periodo = @periodo+ 1
				Set @periodoant=@periodoant +1
				
			End
	--set @periodo = @periodo+ 1
						
	end
	
	select * from #temp
				---drop table #temp	

/*Calculo para el mes de Enero*/

	if (select valor_resultadonetototal from #temp
			where mes_periodo = 1)<=0
			
		Begin
			update #temp
			set Impuesto = 0
			where mes_periodo = 1

		End
	Else 
	    Begin
		  
		  update #temp
			set Impuesto = (valor_resultadonetototal*@Porcentaje_imp)
			where mes_periodo = 1

		End
/*Escenario 1, el impuesto anterior es cero, el acumulado y el resultado neto es negativo */
Set @periodo=2

While @periodo <= 12 and @periodo != 1 
	
	BEGIN
	 
	 select @valor=valor_RESULTADONETOTOTAL,@valoracumulado=Acumulado_RESULTADONETOTOTAL,
	 @impuestoant = Impuesto
	 from #temp
	 where Mes_Periodo= (@periodo-1)

	 select @periodo as pup

	 update #temp
	 set Impuesto = (case when @impuestoant= 0 and @valoracumulado<0 and @valor<0 then 0--Escenario1
						  when @impuestoant= 0 and @valoracumulado<0 and @valor>0 then 0 --Escenario2
						  when @impuestoant= 0 and @valoracumulado>0 and @valor>0 then (valor_resultadonetototal*@Porcentaje_imp)--Escenario3
						  when @impuestoant> 0 and @valoracumulado>0 and @valor<0 then (valor_resultadonetototal*@Porcentaje_imp)--Escenario4
						  when @impuestoant<0 and @valoracumulado>0 and @valor>0 then (valor_resultadonetototal*@Porcentaje_imp)--Escenario5
						  when @impuestoant<0 and @valoracumulado>0 and @valor>0 then (valor_resultadonetototal*@Porcentaje_imp)--Escenario6
						  when @impuestoant<0 and @valoracumulado<0 and @valor>0 then ((valor_resultadonetototal*@Porcentaje_imp)*-1)--Escenario7
						  Else (valor_resultadonetototal*@Porcentaje_imp) end )
	 where Mes_Periodo= @periodo

	 set @periodo=@periodo+1
	END

		select * from #temp
		--drop table #temp
END

```
