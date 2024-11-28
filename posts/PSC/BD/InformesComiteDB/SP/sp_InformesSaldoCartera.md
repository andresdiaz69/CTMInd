# Stored Procedure: sp_InformesSaldoCartera

## Usa los objetos:
- [[InformesSaldoCartera]]

```sql


---- AL PR ST usp_GIEFormulas_SEL_FI_SaldoCartera AL PR ST usp_GIEFormulas_SEL_FI_SaldoCartera
CREATE PROCEDURE [dbo].[sp_InformesSaldoCartera] 
(@IdEmpresas smallint=null,@IdCentros smallint=null,@FechaVtoDesde datetime,@IdFacturaTipos nvarchar(1)=null, @DiasDesde int=null, @DiasHasta int=null,@IdSecciones int = null,@IdDepartamentos nvarchar(3) = null,@Saldo as decimal(38,4) Output)

as
BEGIN

	SET NOCOUNT ON;

	declare @FechaVtoHasta as datetime

	IF @DiasDesde is not null
		  set @FechaVtoDesde=@FechaVtoDesde+isnull(@DiasDesde,0) 
	IF @DiasHasta is not null
		  set @FechaVtoHasta=@FechaVtoDesde+isnull(@DiasHasta+1,0)

	select @Saldo=isnull(round(sum(t1.ImporteEfecto+ISNULL(t1.ImporteGasto,0)), 0),0)
	from InformesSaldoCartera t1 with (nolock) 	
	where t1.FechaVto>=@FechaVtoDesde and t1.FechaVto<@FechaVtoHasta 
	AND t1.PkFkEmpresas=@IdEmpresas
	AND t1.FkCentros=@IdCentros

end




```
