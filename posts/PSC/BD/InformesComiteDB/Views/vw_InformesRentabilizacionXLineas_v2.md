# View: vw_InformesRentabilizacionXLineas_v2

## Usa los objetos:
- [[InformesIndRentabilizacion_v2]]
- [[InformesPresentaciones]]

```sql





CREATE VIEW [dbo].[vw_InformesRentabilizacionXLineas_v2]
AS
SELECT        TOP (100) PERCENT NombrePresentacion, Año, NombreConcepto, Enero, EneroP, Febrero, FebreroP, Marzo, MarzoP, Abril, AbrilP, Mayo, MayoP, Junio, JunioP, Julio, JulioP, Agosto, AgostoP, Septiembre, SeptiembreP, Octubre, 
                         OctubreP, Noviembre, NoviembreP, Diciembre, DiciembreP, Acumulado, AcumuladoP, PorcentajePPTO, E, Orden, CodigoPresentacion
FROM            dbo.InformesIndRentabilizacion_v2
WHERE        (CodigoPresentacion IN
                             (SELECT        CodigoPresentacion
                               FROM            dbo.InformesPresentaciones
                               WHERE        (IndRentaTipo <> '')))

```
