# View: SCC_v_usuarios

## Usa los objetos:
- [[sis_usuarios]]

```sql


/*
*FECHA:			22-10-2015
*AUTOR:			DAVID GALINDO
*DESCRIPCION:	VISTA usuarios ingenieros
*/

CREATE VIEW [dbo].[SCC_v_usuarios] AS 
	
	Select usu_nombre,nombre_usuario
		 
	FROM	sis_usuarios
```
