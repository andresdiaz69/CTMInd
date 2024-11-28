# Stored Procedure: sp_gth_ConsGridActividades

## Usa los objetos:
- [[GTH_ActividadDesvin]]
- [[GTH_DesvinActividad]]

```sql

-- =============================================
-- Author:		Andrea Velez
-- Create date: Abril / 2019
-- Description:	Realiza la inserción, consulta y eliminación para los Grids Actividades de Desvinculación
-- =============================================

CREATE PROCEDURE [dbo].[sp_gth_ConsGridActividades]
	@IndFun		INT, /*1 - Creación, 2 - Consulta, 3 - Eliminación*/
	@Cod_emp	CHAR(12),
	@fec_proc	DATETIME,
	@cod_activ	INT = NULL
	
--WITH ENCRYPTION 
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	
	IF @IndFun = 1
	BEGIN
		INSERT
		INTO	GTH_ActividadDesvin(cod_emp, fec_proceso, cod_activ, fec_ejecucion)
		SELECT	cod_emp = @Cod_emp, fec_proceso = @fec_proc, cod_activ = @cod_activ, fec_ejecucion = GETDATE()
		
	END;

	IF @IndFun = 2
	BEGIN
		
		SELECT	Act.cod_activ, Con.des_activ, Act.fec_ejecucion, Act.fec_cierre,
				DATEADD(Day, Con.dias_activ,  Act.fec_proceso) AS fec_calculada, 
				CASE WHEN Act.fec_cierre < DATEADD(Day, Con.dias_activ,  Act.fec_proceso) THEN '3'					 
					 WHEN GETDATE() < DATEADD(Day, Con.dias_activ,  Act.fec_proceso) THEN '2'
					 WHEN (Act.fec_cierre >  DATEADD(Day, Con.dias_activ,  Act.fec_proceso)) OR 
						  (GETDATE() > DATEADD(Day, Con.dias_activ,  Act.fec_proceso)) THEN '1'
				END AS Estado
		FROM	GTH_ActividadDesvin AS Act
		INNER	JOIN GTH_DesvinActividad AS Con ON Act.cod_activ = Con.cod_activ
		WHERE	cod_emp = @Cod_emp 
				AND CAST(fec_proceso AS DATE) = CAST(@fec_proc AS DATE)
	END;

	IF @IndFun = 3
	BEGIN
		
		DELETE 
		FROM GTH_ActividadDesvin
		WHERE cod_emp = @Cod_emp and fec_proceso = @fec_proc and cod_activ= @cod_activ 
	END;	
END;

```
