# View: vw_JefeDeVentasDaimlerCll13_22

## Usa los objetos:
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_JefeDeVentasDaimlerCll13_21]]

```sql

CREATE VIEW [dbo].[vw_JefeDeVentasDaimlerCll13_22]
AS
SELECT        dbo.ExogenasEmpleadosCentrosPago.CodigoEmpleado, dbo.vw_JefeDeVentasDaimlerCll13_21.Ano_Periodo, dbo.vw_JefeDeVentasDaimlerCll13_21.Mes_Periodo, dbo.vw_JefeDeVentasDaimlerCll13_21.CodigoEmpresa, 
                         dbo.ExogenasEmpleadosCentrosPago.CodigoCentro, dbo.vw_JefeDeVentasDaimlerCll13_21.Centro, dbo.vw_JefeDeVentasDaimlerCll13_21.CodigoMArca, dbo.vw_JefeDeVentasDaimlerCll13_21.Marca, 
                         dbo.vw_JefeDeVentasDaimlerCll13_21.VehiculosRecaudados, dbo.vw_JefeDeVentasDaimlerCll13_21.VentasNacionales, dbo.vw_JefeDeVentasDaimlerCll13_21.PesoComercial
FROM            dbo.vw_JefeDeVentasDaimlerCll13_21 RIGHT OUTER JOIN
                         dbo.ExogenasEmpleadosCentrosPago ON dbo.vw_JefeDeVentasDaimlerCll13_21.CodigoCentro = dbo.ExogenasEmpleadosCentrosPago.CodigoCentro
WHERE        (dbo.vw_JefeDeVentasDaimlerCll13_21.Ano_Periodo IS NOT NULL) AND (dbo.ExogenasEmpleadosCentrosPago.CodigoCentro = 85)

```
