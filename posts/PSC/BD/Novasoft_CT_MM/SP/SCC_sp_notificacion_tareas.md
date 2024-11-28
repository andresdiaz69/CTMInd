# Stored Procedure: SCC_sp_notificacion_tareas

## Usa los objetos:
- [[fn_SCC_Nro_Scc]]
- [[SCC_ITEM]]
- [[SCC_ParamTarea]]
- [[SCC_Tarea_responsable]]
- [[SCC_TareaItem]]
- [[sis_usuarios]]
- [[sp_send_dbmail]]

```sql

CREATE PROCEDURE [dbo].[SCC_sp_notificacion_tareas]
AS
BEGIN

    DECLARE @Cont INT = 1;
    DECLARE @ContMax INT = 0;
    DECLARE @Correo_escalam VARCHAR(100);
    DECLARE @tableHTML NVARCHAR(MAX);

    DECLARE @Tareas TABLE(
	    Nro                   INT,
	    Dias_Estimados        INT,
	    nombre_usuario_respon SYSNAME,
	    correo_respon         VARCHAR(100),
	    Fecha_inicio          DATE,
	    vigencia              INT,
	    usu_escalam           SYSNAME,
	    correo_escalam        VARCHAR(100),
	    Nro_SCC               VARCHAR(15),
	    Descrip_SCC           VARCHAR(MAX),
	    Descrip_Tarea         VARCHAR(MAX)
					);

    DECLARE @Escalamiento TABLE(
	    Nro                  INT,
	    correo_escalam       VARCHAR(100),
	    Cod_usu_Escalamiento SYSNAME
						 );

    INSERT INTO @Tareas
    SELECT ROW_NUMBER() OVER(PARTITION BY T.Cod_usu_Escalamiento
		 ORDER BY T.Cod_Usu_escalamiento) AS nro,
		 Dias_Estimados,
		 UR.nombre_usuario,
		 ur.email_usuario,
		 tr.Fecha_inicio,
		 --TR.Cod_Usu_responsable,
		 -- DATEADD(day, t.dias_estimados, TR.Fecha_inicio) AS dias,
		 DATEDIFF(DAY, DATEADD(DAY, 1, DATEADD(day, T.dias_estimados, TR.Fecha_inicio)), GETDATE()),
		 SU.nombre_usuario,
		 SU.email_usuario,
		 dbo.fn_SCC_Nro_Scc( ti.Nro_Formato ),
		 I.Descripcion,
		 TI.Descripcion_Tarea
    FROM SCC_ParamTarea AS T
    INNER JOIN SCC_TareaItem AS TI ON T.Cod_Tarea = TI.Cod_Tarea
    INNER JOIN SCC_ITEM AS I ON I.Nro_Formato = TI.Nro_Formato AND I.Nro_item = TI.Nro_Item
    INNER JOIN SCC_Tarea_responsable AS TR ON TR.Nro_Formato = TI.Nro_Formato
									 AND TR.Nro_Item = TI.Nro_Item
									 AND TR.Nro_Tarea = TI.Nro_Tarea
    INNER JOIN sis_usuarios AS SU ON SU.usu_nombre = T.Cod_Usu_Escalamiento
    INNER JOIN sis_usuarios AS UR ON UR.usu_nombre = TR.Cod_Usu_responsable
    WHERE TR.Fecha_Fin IS NULL;

    DELETE FROM @Tareas
    WHERE Vigencia = 0;

    SELECT @ContMax = COUNT(*)
    FROM @Tareas;

    INSERT INTO @Escalamiento
    SELECT ROW_NUMBER() OVER(
		 ORDER BY T.correo_escalam),
		 T.correo_escalam,
		 T.usu_escalam
    FROM @Tareas AS T
    WHERE T.Nro = 1 AND LEN(T.Correo_escalam) > 0;

    WHILE @Cont <= @ContMax
    BEGIN

	   SELECT @Correo_escalam = correo_escalam
	   FROM @Escalamiento
	   WHERE Nro = @Cont;

	   SELECT @tableHTML = N'<H1> Tareas Vencidas :</H1>' + N'<table border="1">' + N'<tr><th>Nro Solicitud</th><th>Descripcion Solicitud</th>' +
	   N'<th>Descripcion Tarea</th><th>Fecha Asignacion</th>' + N'<th>Dias Vencida</th></tr>' + CAST((
			SELECT td = Nro_SCC,
				  '',
				  td = Descrip_SCC,
				  '',
				  td = Descrip_Tarea,
				  '',
				  td = Fecha_inicio,
				  '',
				  td = vigencia,
				  ''
			FROM @Tareas AS d
			WHERE correo_escalam = @Correo_escalam
			ORDER BY Correo_escalam ASC,
				    Nro_SCC FOR XML PATH('tr'), TYPE
																				  ) AS NVARCHAR(MAX)) + N'</table>';
	   EXEC msdb.dbo.sp_send_dbmail @profile_name = 'NotificacionesNovasoft',
							  @recipients = @Correo_escalam,
							  @subject = 'Listado de Tareas Vencidas',
							  @body = @tableHTML,
							  @body_format = 'HTML';

	   SET @Cont = @Cont + 1;
    END;

END;

```
