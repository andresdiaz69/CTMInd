# View: vw_InformesRentabilizacionCasatoroConcesionarios

## Usa los objetos:
- [[InformesIndRentabilizacion]]
- [[InformesPresentaciones]]

```sql



CREATE VIEW [dbo].[vw_InformesRentabilizacionCasatoroConcesionarios]
AS
SELECT        TOP (100) PERCENT 'Concesionarios' AS NombrePresentacion, Año, NombreConcepto, 'Acumulado a Diciembre' AS Titulo1, SUM(AcumuladoP) AS Presupuesto1, 
                         SUM(Acumulado) AS Realizado1, 'Diciembre' AS Titulo2, SUM(DiciembreP) AS Presupuesto2, SUM(Diciembre) AS Realizado2, Orden
FROM            (SELECT        CodigoPresentacion, NombrePresentacion, Año, NombreConcepto, AcumuladoP, Acumulado, Diciembre, DiciembreP, Orden
                          FROM            dbo.InformesIndRentabilizacion
                          WHERE        (CodigoPresentacion IN
                                                        (SELECT        CodigoPresentacion
                                                          FROM            dbo.InformesPresentaciones
                                                          WHERE        (IndRentaTipo = 'Concesionarios') AND (EmpresaPrincipal = 1)))) AS a
GROUP BY Año, NombreConcepto, Orden

```
