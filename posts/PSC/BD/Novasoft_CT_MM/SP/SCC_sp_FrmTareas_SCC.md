# Stored Procedure: SCC_sp_FrmTareas_SCC

## Usa los objetos:
- [[cxc_cliente]]
- [[fn_SCC_ValidaUsuConsulta]]
- [[SCC_Cabeza]]
- [[SCC_Item]]
- [[SCC_Tarea_responsable]]
- [[SCC_TareaItem]]
- [[SCC_Tramite_Solicitud]]
- [[sis_usuarios]]

```sql
CREATE PROCEDURE [dbo].[SCC_sp_FrmTareas_SCC]
	@Tran        TINYINT,
	@Nro_Formato INT,
	@Nro_Item    INT,
	@Nro_Tarea   INT,
	@Usuario     SYSNAME
AS
BEGIN

    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    IF @Tran = 1
    BEGIN
	   SELECT C.Nro_scc AS Solicitud,
			T.Descripcion AS EstadoSolicitud,
			I.Descripcion AS Descripcion,
			CONCAT(I.Nombres_Solicitante, ' ', I.Apellidos_Solicitante) AS Solicitante,
			I.Telefono_solicitante AS Telefono,
			I.correo_e_solicitante AS Correo
	   FROM SCC_Cabeza AS C
	   INNER JOIN SCC_Item AS I ON C.Nro_formato = I.Nro_formato
	   INNER JOIN SCC_Tramite_Solicitud AS T ON T.Ind_tramite = C.Ind_tramite
	   WHERE C.Nro_Formato = @Nro_Formato;

    END;

    IF @Tran = 2
    BEGIN

	   IF(dbo.fn_SCC_ValidaUsuConsulta( @Usuario )) = 1
	   BEGIN
		  SELECT TI.Nro_Formato AS Nro_Formato,
			    TI.Nro_Item AS Nro_Item,
			    TI.Nro_Tarea AS Nro_Tarea,
			    TI.Cod_Tarea AS Cod_Tarea,
			    TI.Descripcion_Tarea AS Descripcion_Tarea,
			    TI.EsfuerzoEstimado AS EsfuerzoEstimado,
			    TR.Esfuerzo_Real AS EsfuerzoReal,
			    TR.Estadotarea AS Estadotarea,
			    TR.Cod_Usu_responsable AS Cod_Usu_responsable,
			    TI.Fecha_inicio AS Fecha_inicio,
			    TR.Fecha_Fin AS Fecha_Fin,
			    T.Descripcion AS estado_tarea,
			    US.nombre_usuario AS Responsable,
			    CL.nom_cli AS Cliente,
			    I.Cod_cli AS Cod_Cliente
		  FROM SCC_CABEZA AS C
		  INNER JOIN SCC_ITEM AS I ON C.Nro_formato = I.Nro_formato
		  INNER JOIN SCC_TareaItem AS TI ON I.Nro_Formato = TI.Nro_formato AND I.Nro_Item = TI.Nro_Item
		  INNER JOIN SCC_Tarea_responsable AS TR ON TR.Nro_Formato = TI.Nro_Formato
										    AND tr.Nro_Item = TI.Nro_Item
										    AND TR.Nro_Tarea = TI.Nro_Tarea
										   
		  INNER JOIN SCC_Tramite_Solicitud AS T ON T.Ind_tramite = TR.EstadoTarea
		  INNER JOIN sis_usuarios AS us ON US.usu_nombre = TR.Cod_Usu_responsable
		  INNER JOIN cxc_cliente AS CL ON CL.cod_cli = I.Cod_cli
		  WHERE C.Nro_Formato = @Nro_Formato;
	   END;
		  ELSE
	   BEGIN
		  SELECT TI.Nro_Formato AS Nro_Formato,
			    TI.Nro_Item AS Nro_Item,
			    TI.Nro_Tarea AS Nro_Tarea,
			    TI.Cod_Tarea AS Cod_Tarea,
			    TI.Descripcion_Tarea AS Descripcion_Tarea,
			    TI.EsfuerzoEstimado AS EsfuerzoEstimado,
			    TR.Esfuerzo_Real AS EsfuerzoReal,
			    TR.Estadotarea AS Estadotarea,
			    TR.Cod_Usu_responsable AS Cod_Usu_responsable,
			    TI.Fecha_inicio AS Fecha_inicio,
			    TR.Fecha_Fin AS Fecha_Fin,
			    T.Descripcion AS estado_tarea,
			    US.nombre_usuario AS Responsable
		  FROM SCC_CABEZA AS C
		  INNER JOIN SCC_ITEM AS I ON C.Nro_formato = I.Nro_formato
		  INNER JOIN SCC_TareaItem AS TI ON I.Nro_Formato = TI.Nro_formato AND I.Nro_Item = TI.Nro_Item
		  INNER JOIN SCC_Tarea_responsable AS TR ON TR.Nro_Formato = TI.Nro_Formato
										    AND tr.Nro_Item = TI.Nro_Item
										    AND TR.Nro_Tarea = TI.Nro_Tarea
										    AND TR.Cod_Usu_responsable = @Usuario
		  INNER JOIN SCC_Tramite_Solicitud AS T ON T.Ind_tramite = TR.EstadoTarea
		  INNER JOIN sis_usuarios AS us ON US.usu_nombre = TR.Cod_Usu_responsable
		  WHERE C.Nro_Formato = @Nro_Formato;
	   END;
    END;

    IF @Tran = 3
    BEGIN
	   SELECT EstadoTarea
	   FROM SCC_Tarea_responsable
	   WHERE Nro_Formato = @Nro_Formato AND Nro_Item = @Nro_Item AND Nro_Tarea = @Nro_Tarea;
    END;

END;


```
