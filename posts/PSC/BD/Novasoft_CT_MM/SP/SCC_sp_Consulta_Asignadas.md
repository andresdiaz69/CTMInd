# Stored Procedure: SCC_sp_Consulta_Asignadas

## Usa los objetos:
- [[SCC_Anexo_Item]]
- [[SCC_Area]]
- [[SCC_Cabeza]]
- [[SCC_Complejidad]]
- [[SCC_ITEM]]
- [[SCC_Prioridad]]
- [[SCC_Proceso]]
- [[SCC_TipoSCC]]
- [[SCC_Tramite_Solicitud]]

```sql
CREATE PROCEDURE [dbo].[SCC_sp_Consulta_Asignadas]
	@Nro_SCC          VARCHAR(15) = '%',
	@IndicadorTramite CHAR(1)     = '%',
	@Tipo_SCC         CHAR(1)     = '%',
	@Cod_Proceso      VARCHAR(15) = '%',
	@FechaInicial     DATETIME    = '20180101',
	@FechaFinal       DATETIME    = '20180531'
AS
BEGIN

    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    CREATE TABLE #T_ANEXOS(
	    Nro_formato INT,
	    Nro_item    INT,
	    ANEXO       CHAR(1)
					 );

    /***Se crean las variables tipo tabla para almacenar los datos que corresponden a los criterios***/
    DECLARE @TNroSCC TABLE(
	    Nro_SCC VARCHAR(15)
					 );
    DECLARE @TTramite TABLE(
	    Ind_tramite TINYINT,
	    Descripcion VARCHAR(50)
					  );
    DECLARE @TUsuario TABLE(
	    Cod_usu        SYSNAME,
	    nombre_usuario VARCHAR(100)
					  );
    DECLARE @TTipo_SCC TABLE(
	    Tipo_SCC TINYINT
					   );
    DECLARE @TCod_Proceso TABLE(
	    Cod_Proceso VARCHAR(15),
	    DESCRIPCION VARCHAR(200)
						 );

    /*** Si dentro de los parametros se encuentra el comodin, en la tabla temporal se almacenan todos los registros de la tabla de referencia del parámetro***/

    IF @Tipo_SCC = '%'
    BEGIN
	   INSERT INTO @TTipo_SCC( Tipo_SCC )
	   SELECT Tipo_SCC
	   FROM SCC_TipoSCC;
    END;
	   ELSE
    BEGIN
	   INSERT INTO @TTipo_SCC( Tipo_SCC )
	   SELECT Tipo_SCC
	   FROM SCC_TipoSCC
	   WHERE Tipo_SCC = @Tipo_SCC;
    END;
    IF @IndicadorTramite = '%'
    BEGIN
	   INSERT INTO @TTramite( Ind_tramite,
						 Descripcion
					    )
	   SELECT Ind_tramite,
			Descripcion
	   FROM SCC_Tramite_Solicitud;

    END;
	   ELSE
    BEGIN
	   INSERT INTO @TTramite( Ind_tramite,
						 Descripcion
					    )
	   SELECT Ind_tramite,
			Descripcion
	   FROM SCC_Tramite_Solicitud
	   WHERE Ind_tramite = @IndicadorTramite;
    END;

    IF @Nro_SCC = '%'
    BEGIN
	   INSERT INTO @TNroSCC( Nro_SCC )
	   SELECT Nro_SCC
	   FROM SCC_Cabeza;
    END;
	   ELSE
    BEGIN
	   INSERT INTO @TNroSCC( Nro_SCC )
	   SELECT Nro_SCC
	   FROM SCC_Cabeza
	   WHERE Nro_SCC = @Nro_SCC;
    END;

    IF @Cod_Proceso = '%'
    BEGIN
	   INSERT INTO @TCod_Proceso( Cod_proceso,
							Descripcion
						   )
	   SELECT Cod_Proceso,
			DescripProceso
	   FROM SCC_Proceso;
    END;
	   ELSE
    BEGIN
	   INSERT INTO @TCod_Proceso( Cod_proceso,
							Descripcion
						   )
	   SELECT Cod_Proceso,
			DescripProceso
	   FROM SCC_Proceso
	   WHERE Cod_Proceso = @Cod_Proceso;
    END;

    WITH ANEXOS(NID,
			 Nro_formato,
			 Nro_item,
			 Anexo)
	    AS (SELECT ROW_NUMBER() OVER(PARTITION BY IT.Nro_formato,
										 IT.Nro_item
				ORDER BY IT.NRO_FORMATO,
					    IT.NRO_ITEM) AS NID,
				it.nro_formato,
				it.nro_item,
				AN.Nro_Formato
		   FROM SCC_CABeza AS C
		   INNER JOIN SCC_ITEM AS IT ON IT.NRO_FORMATO = C.NRO_FORMATO
		   INNER JOIN @TTramite AS TT ON TT.Ind_tramite = IT.Ind_tramite
		   INNER JOIN @TTipo_SCC AS TS ON TS.Tipo_SCC = C.Tipo_SCC
		   INNER JOIN @TNroSCC AS TN ON TN.Nro_SCC = C.Nro_SCC
		   LEFT JOIN SCC_Anexo_Item AS AN ON C.NRO_FORMATO = AN.Nro_Formato AND AN.Nro_Item = it.Nro_item)

	    INSERT INTO #T_ANEXOS( Nro_formato,
						  Nro_item,
						  ANEXO
						)
	    SELECT Nro_formato,
			 Nro_item,
			 CASE
				WHEN ANEXO IS NULL THEN 'N'
				ELSE 'S'
			 END
	    FROM ANEXOS
	    WHERE NID = 1;

    /*** Sentencia que retorna los datos necesarios***/
    SELECT C.Nro_Formato,
		 C.Nro_SCC,
		 C.Fecha_Recibido AS FechaIngreso,
		 CP.Descripcion AS Complejidad,
		 P.Descripcion AS Prioridad,
		 C.Dias_estimados AS Dias_Estimados,
		 IT.Fecha_Estimada AS Fecha_Estimada
		 ,--,IT.FechaIngeniero AS Fecha_Ingeniero
		 T.Descripcion AS Tipo_Solicitud,
		 CASE C.Tipo_SCC
			WHEN 1 THEN DATEDIFF(DAY, GETDATE(), C.Fecha_estimada)
			ELSE 0
		 END AS DiasVigencia,
		 CASE C.Tipo_SCC
			WHEN 1 THEN CASE
						 WHEN DATEDIFF(DAY, GETDATE(),
											   CASE C.Fecha_estimada
												  WHEN '19000101' THEN GETDATE()
												  ELSE C.Fecha_estimada
											   END) > 3
							 AND IT.Ind_tramite IN(1, 2, 3) THEN ''
						 WHEN DATEDIFF(DAY, GETDATE(),
											   CASE C.Fecha_estimada
												  WHEN '19000101' THEN GETDATE()
												  ELSE C.Fecha_estimada
											   END) > 0
							 AND DATEDIFF(DAY, GETDATE(),
												  CASE C.Fecha_estimada
													 WHEN '19000101' THEN GETDATE()
													 ELSE C.Fecha_estimada
												  END) <= 3
							 AND IT.Ind_tramite IN(1, 2, 3) THEN 'POR VENCER'
						 WHEN IT.ind_tramite = 4 THEN 'RECHAZADA'
						 WHEN IT.ind_tramite = 5 THEN 'ENTREGADA'
						 WHEN IT.Ind_tramite = 6 THEN 'TERMINADA'
						 ELSE 'VENCIDA'
					  END
			ELSE 'NO APLICA'
		 END AS COLOR,
		 TT.Descripcion AS Tramite,
		 C.Tipo_SCC,
		 IT.Nro_item,
		 AN.ANEXO AS ANEXOS,
		 it.cod_proceso,
		 TP.Descripcion AS DescripProceso,
		 AR.Cod_area,
		 AR.DescripArea,
		 CASE it.ind_tramite
			WHEN 1 THEN 'ESTUDIO'
			WHEN 2 THEN 'TRAMITE'
			WHEN 4 THEN 'RECHAZADA'
			WHEN 5 THEN 'ENTREGADA'
			WHEN 6 THEN 'TERMINADA'
		 END AS DescTramite
    FROM SCC_Cabeza AS C
    INNER JOIN SCC_Complejidad AS CP ON CP.Complejidad = C.Complejidad
    INNER JOIN SCC_Prioridad AS P ON P.Prioridad = C.Prioridad_Analista
    INNER JOIN SCC_TipoSCC AS T ON T.Tipo_SCC = C.Tipo_SCC
    INNER JOIN SCC_ITEM AS IT ON IT.Nro_Formato = C.Nro_Formato
    INNER JOIN @TTramite AS TT ON TT.Ind_tramite = IT.Ind_tramite
    INNER JOIN @TTipo_SCC AS TS ON TS.Tipo_SCC = C.Tipo_SCC
    INNER JOIN @TNroSCC AS TN ON TN.Nro_SCC = C.Nro_SCC
    INNER JOIN @TCod_Proceso AS TP ON TP.Cod_Proceso = IT.Cod_proceso
    INNER JOIN #T_ANEXOS AS AN ON AN.Nro_formato = IT.Nro_Formato AND AN.Nro_item = IT.Nro_item
    INNER JOIN SCC_Area AS AR ON AR.Cod_area = IT.Cod_area
    WHERE C.Fecha_Recibido >= @FechaInicial AND C.Fecha_Recibido <= @FechaFinal
    ORDER BY C.Nro_Formato,
		   IT.Nro_item;

END;

```
