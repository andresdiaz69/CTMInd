# View: vw_JefesDeTallerVolkswagen_4

## Usa los objetos:
- [[ExogenasEmpleadosSeccionesPago]]
- [[vw_JefesDeTallerVolkswagen_3]]

```sql







CREATE VIEW [dbo].[vw_JefesDeTallerVolkswagen_4]
AS
SELECT        dbo.ExogenasEmpleadosSeccionesPago.CodigoEmpleado, dbo.vw_JefesDeTallerVolkswagen_3.Ano_Periodo, dbo.vw_JefesDeTallerVolkswagen_3.Mes_Periodo, dbo.vw_JefesDeTallerVolkswagen_3.CodigoEmpresa, 
                         dbo.vw_JefesDeTallerVolkswagen_3.CodigoCentro, dbo.vw_JefesDeTallerVolkswagen_3.Centro, 
						 dbo.vw_JefesDeTallerVolkswagen_3.CodigoSeccion, dbo.vw_JefesDeTallerVolkswagen_3.Seccion, 
						 dbo.vw_JefesDeTallerVolkswagen_3.ValorVariable, dbo.vw_JefesDeTallerVolkswagen_3.Facturacion, 
                         dbo.vw_JefesDeTallerVolkswagen_3.Comision_Facturacion
FROM            dbo.ExogenasEmpleadosSeccionesPago LEFT OUTER JOIN
                         dbo.vw_JefesDeTallerVolkswagen_3 
						 ON 
						 dbo.ExogenasEmpleadosSeccionesPago.CodigoCentro = dbo.vw_JefesDeTallerVolkswagen_3.CodigoCentro
						 AND
						 dbo.ExogenasEmpleadosSeccionesPago.CodigoSeccion = dbo.vw_JefesDeTallerVolkswagen_3.CodigoSeccion
WHERE        (dbo.vw_JefesDeTallerVolkswagen_3.Ano_Periodo IS NOT NULL)


```
