# Stored Procedure: sp_Presupuesto_Calculo_GAC_Centros

## Usa los objetos:
- [[Presupuestos_calculo_Gac]]
- [[vw_presupuestoGacXLineaCentro]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuesto_Calculo_GAC_Centros]
	-- Add the parameters for the stored procedure here
	@linea int,
	@centro int,
	@idclase int,
	@anio int 

AS
-- =============================================
-- Author:		Manuel Suarez
-- Create date: 091124
-- Description:	se crea en el proyecto de presupuestos para consolidar el GAC por centro y trimestre.

-- Control de Cambios:		Juan Carlos Sánchez
-- Create date: 091124
-- Description:	se le agrega autonumérico para poderlo mapear en el .net entity.

-- =============================================
--declare @linea int =19;
--declare @anio  int =2025
--declare @idClase int =1
--declare @centro  int =1
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SET FMTONLY OFF;

	 IF OBJECT_ID('tempdb.dbo.#GacTodo', 'U') IS NOT NULL
                DROP TABLE #GacTodo;
	Declare @Gac int = 1721710000
    BEGIN TRAN;
    BEGIN TRY

	select g.Anoperiodo, g.trimestre, g.codigolinea, g.codigocentro, g.idclase, ((Facturas+Personas+Oficinas+activos)/4)/100*@Gac promedio, 
	       c.porcentaje ingresos , valorGac = ((((Facturas+Personas+Oficinas+activos)/4)/100)*@Gac)*(c.porcentaje/100)
	  into #GacTodo
	  from Presupuestos_calculo_Gac g
	  left join vw_presupuestoGacXLineaCentro c on c.ano_periodo = g.anoperiodo
											   and c.trimestre   = g.trimestre
											   and c.codigolinea = g.codigolinea
											   and c.codigocentro= g.codigocentro
											   and c.idclase     = g.idclase
     where g.anoperiodo   = @anio
	   and g.codigolinea  = @linea
	   and g.codigocentro = @centro
	   and g.idclase      = @idclase;

   MERGE INTO Presupuestos_calculo_Gac pv
            USING #GacTodo tv   ON pv.AnoPeriodo    = tv.AnoPeriodo 
			                   and pv.CodigoLinea   = tv.CodigoLinea
			                   and pv.CodigoCentro  = tv.CodigoCentro
			                   and pv.Trimestre     = tv.Trimestre
							   and pv.idclase       = tv.idclase
             WHEN MATCHED THEN
                  UPDATE SET pv.promedio = tv.promedio,
                             pv.ingresos = tv.ingresos,
                             pv.valorGac = tv.valorGac  ;

            
        
        -- Confirmar transacción
        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        CLOSE CodigosMarcasCursor;
        DEALLOCATE CodigosMarcasCursor;
        THROW;
    END CATCH;

 select 
 ISNULL(ROW_NUMBER() OVER(ORDER BY g.Trimestre ASC), 0) AS Id,
 g.Anoperiodo, g.Trimestre, g.Codigolinea, g.Codigocentro, g.idclase, Promedio,     Ingresos , ValorGac
   from Presupuestos_calculo_Gac g
  where g.anoperiodo   = @anio
	and g.codigolinea  = @linea
	and g.codigocentro = @centro
	and g.idclase      = @idclase;


end

```
