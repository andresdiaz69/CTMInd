# Stored Procedure: sp_GTH_Confirma_Asistencia_Bienestar

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[GTH_EventoInvita]]
- [[GTH_Eventos]]
- [[rhh_emplea]]

```sql

-- ======================================================================
-- Author:		Andrea Velez	
-- Create date: Febrero / 2023
-- Description:	Proceso envio confirmación asistencia a un evento en Bienestar
-- ======================================================================
CREATE PROCEDURE [dbo].[sp_GTH_Confirma_Asistencia_Bienestar]
	@cod_ale	INT,
	@DTNuevo	XML, 
	@DTAnterior XML

--WITH ENCRYPTION 
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE
	@codemp			CHAR(12),
	@codeven		VARCHAR(6),
	@nom_even		VARCHAR(50),
	@fec_even		DATETIME,
	@Nombre			VARCHAR(200),
	@E_mail			VARCHAR(200),
	@sMsg			VARCHAR(2000),
	@idocN			INT,
	@idocA			INT

	EXEC sp_xml_preparedocument @idocN OUTPUT, @DTNuevo;
	EXEC sp_xml_preparedocument @idocA OUTPUT, @DTAnterior;

	SELECT	@codemp = cod_emp, @codeven = cod_even
	FROM	OPENXML (@idocN, '/ROOT/GTH_EventoInvita',1) WITH (cod_emp CHAR(12),cod_even VARCHAR(6))

	SELECT @Nombre= dbo.Fn_rhh_NombreCompleto(@codemp,2)

	SELECT @E_mail = e_mail FROM rhh_emplea
	WHERE cod_emp = @codemp

	SELECT @nom_even = E.nom_even, @fec_even =  E.fch_prog
	FROM GTH_Eventos AS E
	INNER JOIN GTH_EventoInvita AS I ON E.cod_even = I.cod_even
	WHERE I.cod_even = @codeven 
	AND I.cod_emp = @codemp
	AND	I.cod_conf = '03'
	AND E.tip_eve = '002'

	SET @sMsg = 'Cordial saludo</br></br>';
	SET @sMsg  = @sMsg + 'Queremos contarle que ha sido inscrito a la actividad ' +  @nom_even ;	
	SET @sMsg  = @sMsg + ' programada para la fecha ' + FORMAT(@fec_even, 'dd/MM/yyyy') ;
	SET @sMsg  = @sMsg + ' para lo cual se requiere de la confirmación de su asistencia.' + '</br>';
	SET @sMsg  = @sMsg + '</br>' +'Recuerde que esta confirmación puede realizarla a través del portal web.</br></br>';

	IF @sMsg IS NOT NULL AND @E_mail IS NOT NULL
	BEGIN
		SELECT @E_mail AS Correo, @sMsg AS Mensaje
	END
END

```
