# Stored Procedure: Sp_rhh_planilla_de_XML

## Usa los objetos:
- [[rhh_esp326]]
- [[RHH_Planilla_Registro01]]
- [[RHH_Planilla_Registro02]]
- [[RHH_Planilla_Registro03]]
- [[RHH_Planilla_Registro04]]
- [[RHH_Planilla_Registro05]]
- [[Rhh_PlaUnica_XML]]

```sql
-- =============================================
-- Author:		Ricardo Santamaría Vanegas
-- Create date: Octubre 7 de 2011
-- Description:	Lee el XML generado luego de la lectura del plano de la planilla y retorna el tipo de registro que se indique como parámetro
-- =============================================
CREATE PROCEDURE [dbo].[Sp_rhh_planilla_de_XML] 
	@LlavePar	NVARCHAR(100), 
	@nTipReg	INT = 1
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @TabDef TABLE (NumR INT IDENTITY(1,1), CampDef sysname);
	DECLARE @cCadCamp	NVARCHAR(MAX);
	DECLARE @cCadEjeXML	NVARCHAR(MAX);
	DECLARE @cCadEjeCre	NVARCHAR(MAX);
	DECLARE @nRegTot	INT;
	DECLARE @nRegAct	INT;
	DECLARE @RegTag		VARCHAR(10);
	DECLARE @DatosXML	XML
	DECLARE @Llave UNIQUEIDENTIFIER
	DECLARE @cNomTab	SYSNAME
	
	SET	@Llave = @LlavePar

	SELECT	@DatosXML = Planill_Xml 
	FROM	Rhh_PlaUnica_XML
	WHERE	llave = @Llave

	INSERT 
	INTO	@TabDef
			SELECT	RTRIM(nom_cam)+ CASE tip_cam WHEN 'N' THEN ' REAL' ELSE ' VARCHAR(' + RTRIM(CONVERT(CHAR,lon_cam)) +')' END   
			FROM	rhh_esp326 
			WHERE	tip_fdo = 5 AND tip_reg = @nTipReg
			ORDER	BY tip_reg, num_cam;
			
	SET @nRegTot	= @@ROWCOUNT;
	SET @nRegAct	= 1;

	SELECT @RegTag =	CASE @nTipReg 
							WHEN 1 THEN '_x0031_' 
							WHEN 2 THEN '_x0032_'
							WHEN 3 THEN '_x0033_'
							WHEN 4 THEN '_x0034_'
							WHEN 5 THEN '_x0035_'
						END

	SET	@cCadEjeXML = 'DECLARE @idocNum int; EXEC sp_xml_preparedocument @idocNum OUTPUT, @DatosXML; SELECT @Llave, * FROM OPENXML (@idocNum, ''/Registros/' + @RegTag + ''',2) WITH (';
	SET @cCadCamp = '';

	WHILE @nRegAct <= @nRegTot
	BEGIN
		SELECT	@cCadCamp = @cCadCamp + RTRIM(CampDef) + CASE @nRegAct WHEN @nRegTot THEN '' ELSE ', ' END
		FROM	@TabDef
		WHERE	NumR = @nRegAct

		SET @nRegAct = @nRegAct + 1
	END

	SET	@cCadEjeXML = @cCadEjeXML + @cCadCamp + '); EXEC sp_xml_removedocument @idocNum;'

	--SELECT @cCadEjeXML
	
	SET	@cNomTab = 'RHH_Planilla_Registro0' + CONVERT(CHAR(1), @nTipReg)
	IF OBJECT_ID(@cNomTab) IS NULL
	BEGIN
		SET	@cCadEjeCre = 'CREATE TABLE ' + @cNomTab + ' (Llave UNIQUEIDENTIFIER,'+@cCadCamp+')';
		--select @cCadEjeCre
		EXEC(@cCadEjeCre);
	END
	
	
	IF @nTipReg = 1 
		INSERT INTO RHH_Planilla_Registro01 EXEC sp_executesql @cCadEjeXML, N'@Llave UNIQUEIDENTIFIER, @DatosXML XML', @DatosXML = @DatosXML, @Llave = @Llave;
	IF @nTipReg = 2 
		INSERT INTO RHH_Planilla_Registro02 EXEC sp_executesql @cCadEjeXML, N'@Llave UNIQUEIDENTIFIER, @DatosXML XML', @DatosXML = @DatosXML, @Llave = @Llave;
	IF @nTipReg = 3
		INSERT INTO RHH_Planilla_Registro03 EXEC sp_executesql @cCadEjeXML, N'@Llave UNIQUEIDENTIFIER, @DatosXML XML', @DatosXML = @DatosXML, @Llave = @Llave;
	IF @nTipReg = 4
		INSERT INTO RHH_Planilla_Registro04 EXEC sp_executesql @cCadEjeXML, N'@Llave UNIQUEIDENTIFIER, @DatosXML XML', @DatosXML = @DatosXML, @Llave = @Llave;
	IF @nTipReg = 5
		INSERT INTO RHH_Planilla_Registro05 EXEC sp_executesql @cCadEjeXML, N'@Llave UNIQUEIDENTIFIER, @DatosXML XML', @DatosXML = @DatosXML, @Llave = @Llave;

	
	--EXEC sp_executesql @cCadEjeXML, N'@Llave UNIQUEIDENTIFIER, @DatosXML XML', @DatosXML = @DatosXML, @Llave = @Llave;
END

```
