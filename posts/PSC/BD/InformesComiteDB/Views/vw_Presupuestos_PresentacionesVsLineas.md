# View: vw_Presupuestos_PresentacionesVsLineas

## Usa los objetos:
- [[InformesPresentaciones]]
- [[Presupuestos_PresentacionesVsLineas]]
- [[VehiculosMarcas]]

```sql
CREATE VIEW dbo.vw_Presupuestos_PresentacionesVsLineas
AS
SELECT        dbo.Presupuestos_PresentacionesVsLineas.CodigoPresentacion, dbo.InformesPresentaciones.NombrePresentacion, dbo.Presupuestos_PresentacionesVsLineas.CodigoLinea, 
                         DBMLC_0190.dbo.VehiculosMarcas.Marca AS NombreLinea
FROM            dbo.Presupuestos_PresentacionesVsLineas LEFT OUTER JOIN
                         DBMLC_0190.dbo.VehiculosMarcas ON dbo.Presupuestos_PresentacionesVsLineas.CodigoLinea = DBMLC_0190.dbo.VehiculosMarcas.CodigoMarca LEFT OUTER JOIN
                         dbo.InformesPresentaciones ON dbo.Presupuestos_PresentacionesVsLineas.CodigoPresentacion = dbo.InformesPresentaciones.CodigoPresentacion

```
