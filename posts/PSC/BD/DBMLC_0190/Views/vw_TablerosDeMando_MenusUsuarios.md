# View: vw_TablerosDeMando_MenusUsuarios

## Usa los objetos:
- [[Profiles]]
- [[TablerosDeMando_UsuariosMenusSub]]
- [[vw_TablerosDeMando_MenusCompletos]]

```sql

CREATE VIEW [dbo].[vw_TablerosDeMando_MenusUsuarios]
AS
SELECT        isnull(ROW_NUMBER() OVER (ORDER BY dbo.Profiles.UserId), 0) AS Row, dbo.Profiles.UserId, dbo.Profiles.Nombres, dbo.Profiles.Apellidos, dbo.vw_TablerosDeMando_MenusCompletos.*
FROM            dbo.Profiles RIGHT OUTER JOIN
                         dbo.TablerosDeMando_UsuariosMenusSub ON dbo.Profiles.UserId = dbo.TablerosDeMando_UsuariosMenusSub.UserId LEFT OUTER JOIN
                         dbo.vw_TablerosDeMando_MenusCompletos ON dbo.TablerosDeMando_UsuariosMenusSub.IdMenuSub = dbo.vw_TablerosDeMando_MenusCompletos.IdMenuSub

```
