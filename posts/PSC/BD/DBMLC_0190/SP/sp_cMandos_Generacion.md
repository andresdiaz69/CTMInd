# Stored Procedure: sp_cMandos_Generacion

## Usa los objetos:
- [[sp_cMandos_Colision]]
- [[sp_cMandos_Consolidado]]
- [[sp_cMandos_CRM]]
- [[sp_cMandos_Mecanica]]
- [[sp_cMandos_Nuevos]]
- [[sp_cMandos_Repuestos]]
- [[sp_cMandos_Talleres]]
- [[sp_cMandos_Usados]]

```sql


CREATE PROCEDURE [dbo].[sp_cMandos_Generacion] 
	(
	@Año_Periodo int ,
	@Mes_Periodo int 
	)
AS
BEGIN

	SET FMTONLY OFF
	SET NOCOUNT ON

	-- Cuadro de Mandos --

	Declare @Año smallint
	Declare @Mes smallint

	set @Año = @Año_Periodo
	set @Mes = @Mes_Periodo

	Print '---- Inicia Ejecucion Cuadro de Mandos '+ltrim(str(@Mes))+' '+ltrim(str(@Año)) + ' ---- '

	-- CRM ---------------------------------------

	exec sp_cMandos_CRM @Año,@Mes

	-- NUEVOS ------------------------------------

	exec sp_cMandos_Nuevos @Año,@Mes

	-- USADOS ------------------------------------

	exec sp_cMandos_Usados @Año,@Mes

	-- REPUESTOS ------------------------------------

	exec sp_cMandos_Repuestos @Año,@Mes

	-- MECÁNICA ------------------------------------

	exec sp_cMandos_Mecanica @Año,@Mes

	-- COLISIÓN ------------------------------------

	exec sp_cMandos_Colision @Año,@Mes

	-- TALLERES ------------------------------------

	exec sp_cMandos_Talleres @Año,@Mes

	-- Consolidado --------------------------------

	exec sp_cMandos_Consolidado @Año,@Mes

END

```
