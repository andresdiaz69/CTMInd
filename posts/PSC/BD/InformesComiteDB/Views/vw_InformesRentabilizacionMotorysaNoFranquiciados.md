# View: vw_InformesRentabilizacionMotorysaNoFranquiciados

## Usa los objetos:
- [[InformesIndRentabilizacion]]
- [[InformesPresentaciones]]

```sql



CREATE VIEW [dbo].[vw_InformesRentabilizacionMotorysaNoFranquiciados]
AS
SELECT        'No Franquiciados' AS NombrePresentacion, Año, NombreConcepto, 'Acumulado a Diciembre' AS Titulo1, SUM(AcumuladoP) AS Presupuesto1, SUM(Acumulado) 
                         AS Realizado1, 'Diciembre' AS Titulo2, SUM(DiciembreP) AS Presupuesto2, SUM(Diciembre) AS Realizado2, Orden
FROM            (SELECT        CodigoPresentacion, NombrePresentacion, Año, NombreConcepto, AcumuladoP, Acumulado, Diciembre, DiciembreP, Orden
                          FROM            dbo.InformesIndRentabilizacion
                          WHERE        (CodigoPresentacion IN
                                                        (SELECT        CodigoPresentacion
                                                          FROM            dbo.InformesPresentaciones
                                                          WHERE        (IndRentaTipo = 'NoFranquiciados') AND (EmpresaPrincipal = 6)))) AS a
GROUP BY Año, NombreConcepto, Orden

```