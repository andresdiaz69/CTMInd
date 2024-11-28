# Stored Procedure: sp_Hdk_EncuestaSatisfaccion

## Usa los objetos:
- [[Hdk_ClienteLic]]
- [[Hdk_NPS_Pregunta]]
- [[Hdk_NPS_Respuesta]]
- [[Hdk_Ticket]]

```sql
-- =============================================
-- Author:	Jessy Tatiana Peralta
-- Create date: Agosto 17 de 2021
-- Description:	Se consulta las preguntas de satisfacción y se registran las respuestas.

-- =============================================
CREATE PROCEDURE [dbo].[sp_Hdk_EncuestaSatisfaccion]
	@Id_Pregunta	int=0,
	@Id_Usuario		int=0,
	@Respuesta		varchar(2000)='',
	@Id_ClienteLic	INT =1,
	@Opcion			VARCHAR(20) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @Id_Usuario IS NULL 
    BEGIN
	   RETURN;
    END;
	--Consulta las preguntas
	IF @Opcion='Consulta'
	BEGIN
		SELECT Id_Pregunta, DefinicionPregunta,Observaciones,FechaAplicacion,ind_activo
		FROM Hdk_NPS_Pregunta 
	END
	--Inserta las respuestas por cliente
	IF @Opcion='Registro'
	BEGIN
		INSERT INTO Hdk_NPS_Respuesta (Id_Pregunta,Id_Usuario,FechaRespuesta,Respuesta,Id_ClienteLic )
		VALUES (@Id_Pregunta,@Id_Usuario,GETDATE(),@Respuesta,@Id_ClienteLic)
	END
    
    --Valida los tickets que coloco PARA EL CLIENTE que el login coloco el mes anterior
	IF @Opcion='ConsulatCliente'
	BEGIN
		SELECT distinct(t.Id_ClienteLic),c.nom_emplic
		FROM Hdk_Ticket t
			INNER JOIN Hdk_ClienteLic c ON t.Id_ClienteLic=c.Id_ClienteLic
		WHERE Fecha_Ingreso between DATEADD(month, DATEDIFF(month, 0,EOMONTH(getdate(),-1)), 0) and EOMONTH(getdate(),-1) 
		and t.Id_ClienteLic not in 
		(SELECT distinct Id_ClienteLic  FROM Hdk_NPS_Respuesta WHERE Id_Usuario=@Id_Usuario and FechaRespuesta between DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) and EOMONTH(getdate()))
		and T.Id_Usuario=@Id_Usuario

		
	END

    --WHERE U.Usuario = @cUsuario--'aaponteb'

END

```
