# View: vw_JefeDeVentasDaimlerCll13_12

## Usa los objetos:
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_JefeDeVentasDaimlerCll13_11]]

```sql

CREATE VIEW [dbo].[vw_JefeDeVentasDaimlerCll13_12]
AS
SELECT        dbo.ExogenasEmpleadosCentrosPago.CodigoEmpleado, dbo.vw_JefeDeVentasDaimlerCll13_11.Ano_Periodo, dbo.vw_JefeDeVentasDaimlerCll13_11.Mes_Periodo, dbo.vw_JefeDeVentasDaimlerCll13_11.CodigoEmpresa, 
                         dbo.ExogenasEmpleadosCentrosPago.CodigoCentro, dbo.vw_JefeDeVentasDaimlerCll13_11.Centro, dbo.vw_JefeDeVentasDaimlerCll13_11.CodigoMArca, dbo.vw_JefeDeVentasDaimlerCll13_11.Marca, dbo.vw_JefeDeVentasDaimlerCll13_11.VehiculosRecaudados, 
                         dbo.vw_JefeDeVentasDaimlerCll13_11.VentasNacionales, dbo.vw_JefeDeVentasDaimlerCll13_11.PesoComercial
FROM            dbo.vw_JefeDeVentasDaimlerCll13_11 RIGHT OUTER JOIN
                         dbo.ExogenasEmpleadosCentrosPago ON dbo.vw_JefeDeVentasDaimlerCll13_11.CodigoCentro = dbo.ExogenasEmpleadosCentrosPago.CodigoCentro
WHERE        (dbo.vw_JefeDeVentasDaimlerCll13_11.Ano_Periodo IS NOT NULL AND dbo.ExogenasEmpleadosCentrosPago.CodigoCentro = 86)

```
