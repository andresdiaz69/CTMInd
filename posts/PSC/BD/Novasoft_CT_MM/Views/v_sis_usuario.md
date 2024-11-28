# View: v_sis_usuario

## Usa los objetos:
- [[sis_usuarios]]

```sql

CREATE VIEW [dbo].[v_sis_usuario]
AS
	SELECT usu_nombre AS cod_usuario,usu_nombre AS nom_usuario, ISNULL(nombre_usuario,usu_nombre) AS nombre_usuario
	FROM sis_usuarios


```
