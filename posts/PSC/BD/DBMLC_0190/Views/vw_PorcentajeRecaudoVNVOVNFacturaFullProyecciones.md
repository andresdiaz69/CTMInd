# View: vw_PorcentajeRecaudoVNVOVNFacturaFullProyecciones

## Usa los objetos:
- [[vw_PorcentajeRecaudoVNFacturaFullProyecciones]]
- [[vw_PorcentajeRecaudoVOVNFacturaFullProyecciones]]

```sql

CREATE VIEW [dbo].[vw_PorcentajeRecaudoVNVOVNFacturaFullProyecciones]
AS
SELECT        *
FROM            dbo.vw_PorcentajeRecaudoVNFacturaFullProyecciones
UNION ALL
SELECT        *
FROM            dbo.vw_PorcentajeRecaudoVOVNFacturaFullProyecciones



```
