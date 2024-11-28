# View: vw_JefesDePostVentaRenault_4

## Usa los objetos:
- [[ExogenasEmpleadosSeccionesPago]]
- [[vw_JefesDePostVentaRenault_3]]

```sql



CREATE VIEW [dbo].[vw_JefesDePostVentaRenault_4]
AS
SELECT        dbo.ExogenasEmpleadosSeccionesPago.CodigoEmpleado, dbo.vw_JefesDePostVentaRenault_3.Ano_Periodo, dbo.vw_JefesDePostVentaRenault_3.Mes_Periodo, dbo.vw_JefesDePostVentaRenault_3.CodigoEmpresa, 
                         dbo.vw_JefesDePostVentaRenault_3.CodigoCentro, dbo.vw_JefesDePostVentaRenault_3.Centro, 
						 dbo.vw_JefesDePostVentaRenault_3.CodigoSeccion, dbo.vw_JefesDePostVentaRenault_3.Seccion, 
						 dbo.vw_JefesDePostVentaRenault_3.ValorVariable, dbo.vw_JefesDePostVentaRenault_3.Facturacion, 
                         dbo.vw_JefesDePostVentaRenault_3.Comision_Facturacion
FROM            dbo.ExogenasEmpleadosSeccionesPago LEFT OUTER JOIN
                         dbo.vw_JefesDePostVentaRenault_3 
						 ON 
						 dbo.ExogenasEmpleadosSeccionesPago.CodigoCentro = dbo.vw_JefesDePostVentaRenault_3.CodigoCentro
						 AND
						 dbo.ExogenasEmpleadosSeccionesPago.CodigoSeccion = dbo.vw_JefesDePostVentaRenault_3.CodigoSeccion
WHERE        (dbo.vw_JefesDePostVentaRenault_3.Ano_Periodo IS NOT NULL)


```
