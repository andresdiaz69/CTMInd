# Stored Procedure: sp_cMandos_Talleres

## Usa los objetos:
- [[cMandos_Datos]]
- [[cMandos_Estructura]]

```sql



CREATE PROCEDURE [dbo].[sp_cMandos_Talleres] 
(
@Año int, 
@Mes int
)
AS 

BEGIN 

	SET NOCOUNT ON
	SET FMTONLY OFF


	--Estructura
	DECLARE @CodigoTipo smallint
	DECLARE @CodigoRenglon smallint 
	DECLARE @NombreRenglon varchar(50)
	DECLARE @Visible bit
	DECLARE @Msg varchar(200) 
	--Lineas
	DECLARE @CodigoLinea smallint
	DECLARE @CodigoEmpresa smallint 
	DECLARE @CodigoCentro smallint 
	DECLARE @CRM smallint
	DECLARE @VN smallint 
	DECLARE @VU smallint 
	DECLARE @REP smallint
	DECLARE @TMEC smallint 
	DECLARE @TCOL smallint 

	PRINT '------------------- TALLERES ------------------------'

	IF EXISTS(Select * from cMandos_Datos where Año = @Año and Mes = @Mes and CodigoTipo = 7)
	BEGIN
		PRINT 'Inicializando datos del mes'
		DELETE FROM cMandos_Datos where Año = @Año and Mes = @Mes and CodigoTipo = 7
	END

	DECLARE Cursor_Estructura CURSOR FOR
		SELECT CodigoTipo,CodigoRenglon,NombreRenglon 
		FROM cMandos_Estructura
		where CodigoTipo = 7

	OPEN Cursor_Estructura

	FETCH NEXT FROM Cursor_Estructura INTO @CodigoTipo,@CodigoRenglon,@NombreRenglon

	WHILE @@fetch_status = 0
	BEGIN

		set @Msg = @NombreRenglon + '(' + CAST(@CodigoTipo AS VARCHAR) + ',' + CAST(@CodigoRenglon AS VARCHAR) + ')...  '

		SET @msg = @Msg + 'Ok'

		insert into cMandos_Datos
			select @Año,@Mes,Mecanica.CodigoLinea,Mecanica.CodigoEmpresa,Mecanica.CodigoCentro,@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,
			ISNULL(Mecanica.Valor,0)+ISNULL(Colision.Valor,0),Getdate() 
			FROM 
			(select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = 5 and CodigoRenglon = @CodigoRenglon ) Mecanica
			LEFT JOIN 
			(select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = 6 and CodigoRenglon = @CodigoRenglon ) Colision
			ON Mecanica.CodigoLinea = Colision.CodigoLinea and
			Mecanica.CodigoCentro = Colision.CodigoCentro and
			Mecanica.CodigoEmpresa = Colision.CodigoEmpresa
			order by CodigoLinea,CodigoCentro

		SET @msg = LEFT(@Msg + '----------------------------------------',50)


		print @Msg
		FETCH NEXT FROM Cursor_Estructura INTO @CodigoTipo,@CodigoRenglon,@NombreRenglon
	END

	CLOSE Cursor_Estructura
	DEALLOCATE Cursor_Estructura

END


```
