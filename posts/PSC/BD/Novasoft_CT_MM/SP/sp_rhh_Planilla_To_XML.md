# Stored Procedure: sp_rhh_Planilla_To_XML

## Usa los objetos:
- [[RHH_Planilla_Registro01]]
- [[RHH_Planilla_Registro02]]
- [[RHH_Planilla_Registro03]]
- [[RHH_Planilla_Registro04]]
- [[RHH_Planilla_Registro05]]
- [[Rhh_PlaUnica_XML]]
- [[Sp_rhh_planilla_de_XML]]

```sql
-- =============================================
-- Author:		Ricardo Santamaría Vanegas
-- Create date: Octubre 3 de 2011
-- Description:	Inserta en la tabla el dataset de la planilla única en un registro con un ID
-- =============================================
CREATE PROCEDURE [dbo].[sp_rhh_Planilla_To_XML] 
	-- Add the parameters for the stored procedure here
	@Llave UNIQUEIDENTIFIER,
	@InfoPlano XML
AS
BEGIN
	SET NOCOUNT ON;


	DELETE	RHH_Planilla_Registro01
	FROM	dbo.RHH_Planilla_Registro01 R
	WHERE	R.Llave IN 
			(	SELECT	Llave
				FROM	Rhh_PlaUnica_XML
				WHERE	CreaFecha <= DATEADD(HOUR,-2,GETDATE())
			)

	DELETE	RHH_Planilla_Registro02
	FROM	dbo.RHH_Planilla_Registro02 R
	WHERE	R.Llave IN 
			(	SELECT	Llave
				FROM	Rhh_PlaUnica_XML
				WHERE	CreaFecha <= DATEADD(HOUR,-2,GETDATE())
			)


	DELETE	RHH_Planilla_Registro03
	FROM	dbo.RHH_Planilla_Registro03 R
	WHERE	R.Llave IN 
			(	SELECT	Llave
				FROM	Rhh_PlaUnica_XML
				WHERE	CreaFecha <= DATEADD(HOUR,-2,GETDATE())
			)

	DELETE	RHH_Planilla_Registro04
	FROM	dbo.RHH_Planilla_Registro04 R
	WHERE	R.Llave IN 
			(	SELECT	Llave
				FROM	Rhh_PlaUnica_XML
				WHERE	CreaFecha <= DATEADD(HOUR,-2,GETDATE())
			)

	DELETE	RHH_Planilla_Registro05
	FROM	dbo.RHH_Planilla_Registro05 R
	WHERE	R.Llave IN 
			(	SELECT	Llave
				FROM	Rhh_PlaUnica_XML
				WHERE	CreaFecha <= DATEADD(HOUR,-2,GETDATE())
			)

	DELETE 
	FROM	Rhh_PlaUnica_XML
	WHERE	CreaFecha <= DATEADD(HOUR,-2,GETDATE());

	INSERT 
	INTO	Rhh_PlaUnica_XML
			(Llave, Planill_Xml)
	VALUES	(@Llave, @InfoPlano);
	
	EXEC Sp_rhh_planilla_de_XML @Llave,1
	EXEC Sp_rhh_planilla_de_XML @Llave,2
	EXEC Sp_rhh_planilla_de_XML @Llave,3
	EXEC Sp_rhh_planilla_de_XML @Llave,4
	EXEC Sp_rhh_planilla_de_XML @Llave,5
	
END

```
