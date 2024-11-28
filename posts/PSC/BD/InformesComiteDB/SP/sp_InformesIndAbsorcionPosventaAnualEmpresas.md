# Stored Procedure: sp_InformesIndAbsorcionPosventaAnualEmpresas

## Usa los objetos:
- [[informesIndAbsorcionPosventa]]
- [[InformesPresentaciones]]
- [[sp_InformesIndAbsorcionPosventaAnualSedes]]

```sql
create PROCEDURE [dbo].[sp_InformesIndAbsorcionPosventaAnualEmpresas]
	-- Add the parameters for the stored procedure here
	@Año as int,
	@Empresa as smallint = 0

AS
BEGIN
	SET NOCOUNT ON;


	-- Declare the variables to store the values returned by FETCH.  
	DECLARE @NombrePresentacion nvarchar(50),@CodigoPresentacion as smallint
  
	DECLARE contact_cursor CURSOR FOR  
	SELECT NombrePresentacion,CodigoPresentacion FROM InformesPresentaciones where PresentacionPrincipal <> 0 and EmpresaPrincipal = (case when @Empresa=0 then EmpresaPrincipal else @Empresa end) and CodigoPresentacion not in (54,55,49,38)
	--SELECT NombrePresentacion,CodigoPresentacion FROM InformesPresentaciones where PresentacionPrincipal <> 0 and EmpresaPrincipal = (case when 6=0 then EmpresaPrincipal else 6 end) and CodigoPresentacion not in (54,55,49,38)
  
	OPEN contact_cursor
  
	FETCH NEXT FROM contact_cursor  
	INTO @NombrePresentacion, @CodigoPresentacion;  
  
	-- Check @@FETCH_STATUS to see if there are any more rows to fetch.  
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		PRINT @NombrePresentacion
  
		exec sp_InformesIndAbsorcionPosventaAnualSedes @CodigoPresentacion,@Año

		FETCH NEXT FROM contact_cursor  
		INTO @NombrePresentacion, @CodigoPresentacion;  

	END  
  
	CLOSE contact_cursor
	DEALLOCATE contact_cursor

	select 'Total Mensual' NombreInforme, @Empresa Empresa, 0 CodigoPresentacion,'Resumen Mensual' NombrePresentacion,Año,Mes_Trimestre,'Total Mensual' Sede,
		sum(Utilidad_posventa) Utilidad_posventa,
		sum(Gts_Variables) Gts_Variables,
		sum(GtsFijosPersonalSucursal) GtsFijosPersonalSucursal,
		sum(Gts_Generales) Gts_General,
		sum(GAC) GAC,
		case when (sum(GtsFijosPersonalSucursal)+sum(Gts_Generales)+sum(GAC)) <> 0 then
				(sum(Utilidad_posventa) - sum(Gts_Variables))/ (sum(GtsFijosPersonalSucursal)+sum(Gts_Generales)+sum(GAC))
				else
				0
				end AbsorcionPosventa 
	from informesIndAbsorcionPosventa 
	where Año = 2019 
	and Empresa = case when @Empresa <> 0 then @Empresa else Empresa end
	--and Empresa = case when 0 <> 0 then 0 else Empresa end
	and CodigoPresentacion not in (54,55,49,38)
	group by NombreInforme,Año,Mes_Trimestre
	order by NombrePresentacion,Año,Mes_Trimestre 

END


```
