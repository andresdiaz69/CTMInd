# View: vw_cMandos_Presentacion

## Usa los objetos:
- [[cMandos_Datos]]
- [[cMandos_Estructura]]
- [[cMandos_Lineas]]

```sql


CREATE VIEW [dbo].[vw_cMandos_Presentacion]
AS
SELECT        dbo.cMandos_Datos.Año, dbo.cMandos_Datos.Mes, dbo.cMandos_Lineas.CodigoLinea, dbo.cMandos_Lineas.NombreLinea, dbo.cMandos_Estructura.CodigoTipo, dbo.cMandos_Estructura.NombreTipo, 
                         dbo.cMandos_Estructura.CodigoRenglon, dbo.cMandos_Estructura.NombreRenglon, dbo.cMandos_Lineas.CodigoCentro, dbo.cMandos_Lineas.NombreCentro, dbo.cMandos_Datos.Valor, dbo.cMandos_Estructura.Visible
FROM            dbo.cMandos_Estructura LEFT OUTER JOIN
                         dbo.cMandos_Datos ON dbo.cMandos_Datos.CodigoTipo = dbo.cMandos_Estructura.CodigoTipo AND dbo.cMandos_Datos.CodigoRenglon = dbo.cMandos_Estructura.CodigoRenglon INNER JOIN
                         dbo.cMandos_Lineas ON dbo.cMandos_Datos.CodigoLinea = dbo.cMandos_Lineas.CodigoLinea AND dbo.cMandos_Datos.CodigoEmpresa = dbo.cMandos_Lineas.CodigoEmpresa AND 
                         dbo.cMandos_Datos.CodigoCentro = dbo.cMandos_Lineas.CodigoCentro
WHERE        (dbo.cMandos_Estructura.Visible = 1)

```
