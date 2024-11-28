# Stored Procedure: sp_Requisiciones_ComunicacionUsuarios

## Usa los objetos:
- [[Requisiciones_ComunicacionUsuarios]]
- [[v_Requisiciones_DescripcionRol]]

```sql

CREATE PROCEDURE [dbo].[sp_Requisiciones_ComunicacionUsuarios]
(
	@IdSolicitud BIGINT
) AS
BEGIN

	SELECT DISTINCT 
		IdConversacion,					IdSolicitud,								UserID,					
		CedulaUsuario,					NombreUsuario,								FechaRegistro, 					
		Comentario,						CodTipoUsuario_Origen,						TipoUsuario_Origen = O.TipoUsuario,		
		CodTipoUsuario_Destino,			TipoUsuario_Destino = D.TipoUsuario
	
	FROM Requisiciones_ComunicacionUsuarios		AS A
	LEFT JOIN v_Requisiciones_DescripcionRol	AS O ON O.CodTipoUsuario = A.CodTipoUsuario_Origen   
	LEFT JOIN v_Requisiciones_DescripcionRol	AS D ON D.CodTipoUsuario = A.CodTipoUsuario_Destino 
	WHERE IdSolicitud = @IdSolicitud
END

```
