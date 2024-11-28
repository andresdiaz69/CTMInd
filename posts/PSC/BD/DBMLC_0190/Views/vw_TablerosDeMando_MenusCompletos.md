# View: vw_TablerosDeMando_MenusCompletos

## Usa los objetos:
- [[TablerosDeMando_Menus]]
- [[TablerosDeMando_MenusSub]]

```sql

CREATE VIEW [dbo].[vw_TablerosDeMando_MenusCompletos]
AS
SELECT        dbo.TablerosDeMando_Menus.IdMenu, dbo.TablerosDeMando_Menus.Menu, dbo.TablerosDeMando_Menus.Prioridad AS PrioridadMenu, dbo.TablerosDeMando_MenusSub.IdMenuSub, 
                         dbo.TablerosDeMando_MenusSub.MenuSub, dbo.TablerosDeMando_MenusSub.Url, dbo.TablerosDeMando_MenusSub.Prioridad AS PrioridadSubMenu, 
						 
						 
						 CAST(dbo.TablerosDeMando_Menus.Prioridad AS nvarchar(3)) + '. ' + dbo.TablerosDeMando_Menus.Menu + ' - ' + CAST(dbo.TablerosDeMando_MenusSub.Prioridad AS nvarchar(3)) + '. ' + dbo.TablerosDeMando_MenusSub.MenuSub AS MenuCompleto

FROM            dbo.TablerosDeMando_Menus INNER JOIN
                         dbo.TablerosDeMando_MenusSub ON dbo.TablerosDeMando_Menus.IdMenu = dbo.TablerosDeMando_MenusSub.IdMenu

```
