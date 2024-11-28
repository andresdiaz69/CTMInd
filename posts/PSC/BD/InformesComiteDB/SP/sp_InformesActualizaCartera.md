# Stored Procedure: sp_InformesActualizaCartera

## Usa los objetos:
- [[Asientos]]
- [[Efectos]]

```sql

-- =======================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2018-12-19
-- Description:	SP QUE ACTUALIZA LOS SALDOS DE CARTERA DIRECTAMENTE DE SPIGA
-- =======================================================================================================================================

CREATE PROCEDURE [dbo].[sp_InformesActualizaCartera]

AS
BEGIN

	SET NOCOUNT ON;

	IF OBJECT_ID (N'dbo.InformesSaldoCartera', N'U') IS NOT NULL  
		DROP TABLE dbo.InformesSaldoCartera  
	IF OBJECT_ID (N'dbo.InformesSaldoCartera', N'U') IS NOT NULL
		DROP TABLE dbo.InformesSaldoCartera

	DECLARE @AñoInicialCartera DATE
	set @AñoInicialCartera = CONVERT(VARCHAR(25),DATEADD(yy, DATEDIFF(yy, 0, GETDATE())-10, 0),103)
--	set @AñoInicialCartera = GETDATE()

	print @AñoInicialCartera

	select t1.PkFkEmpresas,t2.FkCentros,t2.FkFacturaTipos,t1.FechaVto,
	sum(isnull(t1.ImporteEfecto,0)) ImporteEfecto,sum(isnull(t1.ImporteGasto,0)) ImporteGasto,
	sum(isnull(t1.ImporteEfecto,0)) + sum(isnull(t1.ImporteGasto,0)) ImporteTotal
	into InformesSaldoCartera
	from [192.168.90.10\SPIGAPLUS].DMS00280.FI.Efectos as t1 with (nolock) 
	inner join [192.168.90.10\SPIGAPLUS].DMS00280.FI.Asientos as t2 with (nolock) on t1.PkFkAsientos=t2.PkAsientos 
	and t1.PkFkAñoAsiento=t2.PkAñoAsiento and t1.PkFkEmpresas=t2.PkFkEmpresas  
	where t1.FechaVto>@AñoInicialCartera
	and t1.FkSituacionEfectos=1
	and t1.FechaBaja is null 
	and t2.FechaBaja is null  
	and t2.FkFacturaTipos='E'
	group by t1.PkFkEmpresas,t2.FkCentros,t2.FkFacturaTipos,t1.FechaVto

	
END





```
