# Stored Procedure: sp_GTH_Rechazo_Inscripcion_Bienestar

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[GTH_EventoInvita]]
- [[GTH_Eventos]]
- [[rhh_emplea]]

```sql

-- ======================================================================
-- Author:		Andrea Velez	
-- Create date: Febrero / 2023
-- Description: Rechazo proceso Inscripción a un evento de Bienestar
-- ======================================================================
CREATE PROCEDURE [dbo].[sp_GTH_Rechazo_Inscripcion_Bienestar]
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
	@motivo			NVARCHAR(400),
	@fec_even		DATETIME,
	@Nombre			VARCHAR(200),
	@E_mail			VARCHAR(200),
	@sMsg			VARCHAR(2000),
	@idocN			INT,
	@idocA			INT

	EXEC sp_xml_preparedocument @idocN OUTPUT, @DTNuevo;
	EXEC sp_xml_preparedocument @idocA OUTPUT, @DTAnterior;

	SELECT	@codemp = cod_emp ,@codeven = cod_even 
	FROM	OPENXML (@idocN, '/ROOT/GTH_EventoInvita',1) WITH (cod_emp CHAR(12),cod_even VARCHAR(6))

	SELECT @Nombre= dbo.Fn_rhh_NombreCompleto(@codemp,2)

	SELECT @E_mail = e_mail FROM rhh_emplea
	WHERE cod_emp = @codemp

	SELECT @nom_even = E.nom_even, @fec_even =  E.fch_prog,  @motivo = I.motivo_rech
	FROM GTH_Eventos AS E
	INNER JOIN GTH_EventoInvita AS I ON E.cod_even = I.cod_even
	WHERE I.cod_even = @codeven 
		AND I.cod_emp = @codemp
		AND I.cod_estado = '02'
		AND E.tip_eve = '002'

	SET @sMsg = 'Cordial saludo</br></br>';
	SET @sMsg  = @sMsg + 'Informamos que su inscripción a la actividad ' +  @nom_even ;	
	SET @sMsg  = @sMsg + ' programada para el día ' + FORMAT(@fec_even, 'dd/MM/yyyy') + ' ha sido Rechazada. A continuación, el motivo del rechazo:  ' + @motivo;
	SET @sMsg  = @sMsg + '</br>''</br>' +'Para más información ponerse en contacto con el responsable de la gestión de capacitación de la organización.</br></br>';

	IF @sMsg IS NOT NULL AND @E_mail IS NOT NULL
	BEGIN
		SELECT @E_mail AS Correo, @sMsg AS Mensaje
	END
END

```
