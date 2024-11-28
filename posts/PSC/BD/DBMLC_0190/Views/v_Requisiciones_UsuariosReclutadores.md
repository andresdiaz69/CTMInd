# View: v_Requisiciones_UsuariosReclutadores

## Usa los objetos:
- [[AspNetUsers]]
- [[Profiles]]
- [[Requisiciones_Reclutadores]]
- [[Requisiciones_Reclutadores_Usuarios]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_UsuariosReclutadores] AS
SELECT U.UserId, RU.Cedula_Usuario, U.Nombre_Usuario, RU.Nit_Reclutador, Nombre_Reclutadora = R.Nombre, U.Email 
FROM Requisiciones_Reclutadores_Usuarios AS RU
INNER JOIN Requisiciones_Reclutadores	AS R ON RU.Nit_Reclutador = R.Nit
LEFT JOIN 
(
	SELECT UserId = USERS.Id, USERS.UserName, Nombre_Usuario = P.Nombres + ' ' + P.Apellidos, Email 
	FROM Profiles AS P
	LEFT JOIN AspNetUsers	AS USERS ON P.UserId = USERS.Id
) AS U ON CONVERT(NVARCHAR(500),RU.Cedula_Usuario) = U.UserName

```
