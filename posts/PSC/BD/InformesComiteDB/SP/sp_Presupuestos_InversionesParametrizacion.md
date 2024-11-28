# Stored Procedure: sp_Presupuestos_InversionesParametrizacion

## Usa los objetos:
- [[Presupuestos_IdJerarquias_Inversiones]]
- [[Presupuestos_Inversiones]]
- [[Presupuestos_Jerarquias_Balances]]
- [[vw_Presupuestos_Inversiones_Parametrizados]]

```sql
-- =============================================
-- Author:		<Author,,JHON HERNANDES>
-- Create date: 20241024
-- Description: SP para taer la información de los conceptos de inversiones para editar valores de
--presupuesto.
-- =============================================
CREATE PROCEDURE [dbo].[sp_Presupuestos_InversionesParametrizacion]
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
	SELECT @contador = count(*) from Presupuestos_Inversiones
	where Ano_Periodo = @Anio and CodigoLinea = @Idlinea
	and CodigoCentro = @Idcentro and IdClase = @idclasePre

	If @contador = 0
	 begin
	    select b.IdJerarquia as Idcuenta,b.NombreConcepto as Cuenta ,a.IdJerarquia as Idcuentainv,
		a.NombreConcepto as cuenta_inversion,a.UnidadDeMedidaCalculo,@idclasePre as Idclase,0 as Enero, 0 as Febrero,
		0 as Marzo, 0 as Abril, 0 Mayo, 0 as Junio, 0 as Julio, 0 as Agosto,0 Septiembre, 0 as Octubre,
		0 as Noviembre, 0 as Diciembre
		from Presupuestos_Jerarquias_Balances as a 
		inner join Presupuestos_Jerarquias_Balances as b
		on a.Nivel1 = b.Nivel1 and a.Nivel2 = b.Nivel2
		and a.Nivel3 = b.Nivel3  
		where a.IdJerarquia in (select [IdJerarquiaInversion] from Presupuestos_IdJerarquias_Inversiones)
		and b.Nivel4 = 0
	end
	Else 
	 
	 select Idcuenta,cuenta as Cuenta,idcuentainv as Idcuentainv,cuenta_inversion,UnidadDeMedidaCalculo,Idclase
	 ,Enero, Febrero,Marzo,Abril,Mayo,Junio,
	 Julio,Agosto, Septiembre, Octubre, Noviembre,Diciembre
	 from [dbo].[vw_Presupuestos_Inversiones_Parametrizados]
	 where Ano_Periodo = @Anio and CodigoLinea = @Idlinea
	and CodigoCentro = @Idcentro and IdClase = @idclasePre

	
END

```
