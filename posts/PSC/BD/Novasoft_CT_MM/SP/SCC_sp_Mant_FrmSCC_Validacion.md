# Stored Procedure: SCC_sp_Mant_FrmSCC_Validacion

## Usa los objetos:
- [[fn_SCC_Nro_Formato]]
- [[SCC_Item]]
- [[SCC_sp_InsertaTareas]]
- [[SCC_sp_Mant_SCC_Cabeza]]
- [[SCC_sp_Mant_SCC_Item]]

```sql
-- =============================================
-- Author:		Angélica Maricela Garcia Galvis
-- Create date:	Febrero 2018
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_Item
-- EXEC SCC_sp_Mant_FrmSCC_Validacion 2,'PET2019 - 0012',1,2,1,1,'20191022','','','','','','0','0','2'
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_FrmSCC_Validacion]
	@Tran                      TINYINT, /* 1-Consulta, 2-Actualiza Datos */
	@Nro_SCC                   VARCHAR(15),
	@Nro_item                  INT,
	@Ind_Tramite               TINYINT,
	@Prioridad_Analista        TINYINT,
	@Complejidad               TINYINT,
	@FechaDeEntrega            DATETIME,
	@Respuesta                 VARCHAR(2000),
	@Fecha_Cierre              DATETIME,
	@FormaDeEntrega            VARCHAR(2000),
	@Fecha_Recibo_ValidaClient DATETIME,
	@FormaDeValidacion         VARCHAR(2000),
	@Cod_ubicacion             VARCHAR(15),
	@Cod_area                  VARCHAR(15),
	@Cod_proceso               VARCHAR(15)
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    DECLARE @Mensaje NVARCHAR(500);
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    DECLARE @Tipo_SCC SMALLINT;
    DECLARE @Nro_Formato INT;
    DECLARE @xmlAlerta XML;

    DECLARE @tAlertas TABLE(
	    Nro_Formato VARCHAR(15)
					  );

    SET @Nro_Formato = dbo.fn_SCC_Nro_Formato( @Nro_SCC );

    IF @Tran = 1 /**Consulta**/
    BEGIN
	   EXEC SCC_sp_Mant_SCC_Cabeza 4,
							 @Nro_Formato,
							 0,
							 @Nro_SCC,
							 '19000101',
							 @Ind_Tramite,
							 0,
							 0,
							 0,
							 '19000101',
							 0;

    END;
    IF @Tran = 2 /**Actualiza datos**/
    BEGIN
	   EXEC SCC_sp_Mant_SCC_Cabeza 2,
							 @Nro_Formato,
							 0,
							 @Nro_SCC,
							 '19000101',
							 0,
							 @Prioridad_Analista,
							 @Complejidad,
							 0,
							 '19000101',
							 0;
	   EXEC SCC_sp_Mant_SCC_Item 4,
						    @Nro_Formato,
						    1,
						    '',
						    '19000101',
						    '19000101',
						    0,
						    '',
						    '19000101',
						    '19000101',
						    @Ind_Tramite,
						    '19000101',
						    '',
						    '19000101',
						    '',
						    '19000101',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    @Cod_ubicacion,
						    @Cod_area,
						    @Cod_proceso,
						    '',
						    '',
						    0,
						    '19000101',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '',
						    '';

	   EXEC SCC_sp_InsertaTareas @Nro_Formato,
						    1,
						    @Cod_proceso;

	   INSERT INTO @tAlertas( Nro_Formato )
	   VALUES
			(
			@Nro_Formato );

	   SET @xmlAlerta = ( SELECT *
					  FROM @tAlertas FOR XML RAW('SRS'), ROOT('ROOT') );
	   SELECT '@Mensaje' = 'Se realizo la validación y puesta en tramite de Solicitud de PQRS: ' + @Nro_SCC;
	   SELECT @xmlAlerta;

    END;
    IF @Tran = 3 /**No Procede**/
    BEGIN
	   UPDATE SCC_Item 
	   SET Ind_Tramite = 4 , FechaDeEntrega = GETDATE(), Respuesta = @Respuesta
	   WHERE Nro_Formato = @Nro_Formato
    END

END;


```
