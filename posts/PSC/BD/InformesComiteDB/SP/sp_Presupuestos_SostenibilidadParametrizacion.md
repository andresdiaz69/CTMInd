# Stored Procedure: sp_Presupuestos_SostenibilidadParametrizacion

## Usa los objetos:
- [[Presupuestos_Jerarquias]]
- [[Presupuestos_Sostenibilidad]]
- [[Presupuestos_Sostenibilidad_Conceptos]]
- [[vw_Presupuestos_Sostenibilidad_Parametrizados]]

```sql

-- =============================================
-- Author:		<Author,,JHON HERNANDEZ, Felipe Silva>
-- Create date: 2024 11 08
-- Description: SP para taer la información de los conceptos de sostenibilidad para editar valores de
--presupuesto.
-- =============================================
CREATE PROCEDURE [dbo].[sp_Presupuestos_SostenibilidadParametrizacion]
	-- Add the parameters for the stored procedure here
	@Anio smallint, 
	@Idlinea smallint,
	@Idcentro smallint,
	@idclasePre smallint 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Declare @contador int
    -- Insert statements for procedure here
	SELECT 
		@contador = count(*) from Presupuestos_Sostenibilidad
			where 
			Ano_Periodo = @Anio 
		and CodigoLinea = @Idlinea
		and CodigoCentro = @Idcentro 
		and IdClase = @idclasePre

	If @contador = 0
	 begin
	    Select 
		b.Id as IdJerarquia,
		b.nombreconcepto as Concepto,
		@idclasePre as Idclase,
		0 as Enero, 
		0 as Febrero,
		0 as Marzo, 
		0 as Abril, 
		0 Mayo, 
		0 as Junio, 
		0 as Julio, 
		0 as Agosto,
		0 Septiembre, 
		0 as Octubre,
		0 as Noviembre, 
		0 as Diciembre
		
		FROM 
			Presupuestos_Jerarquias as A 
			RIGHT join 
			Presupuestos_Sostenibilidad_Conceptos as B on A.IdJerarquia = B.Id
	end

	Else 
	 
	 select 

	 Idcuenta,
	 cuenta as Cuenta,
	 Idclase,
	 Enero, 
	 Febrero,
	 Marzo,
	 Abril,
	 Mayo,
	 Junio,
	 Julio,
	 Agosto, 
	 Septiembre, 
	 Octubre, 
	 Noviembre,
	 Diciembre
	 
	 from [dbo].[vw_Presupuestos_Sostenibilidad_Parametrizados]
	 where 
		Ano_Periodo = @Anio 
	and CodigoLinea = @Idlinea
	and CodigoCentro = @Idcentro and IdClase = @idclasePre
	
	
END

```
