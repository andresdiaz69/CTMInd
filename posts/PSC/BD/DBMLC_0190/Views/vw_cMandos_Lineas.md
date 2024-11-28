# View: vw_cMandos_Lineas

## Usa los objetos:
- [[InformesPresentaciones]]
- [[vw_InformesConfiguracionPresentaciones]]

```sql


CREATE VIEW [dbo].[vw_cMandos_Lineas]
AS
SELECT        vw.CodigoPresentacion AS CodigoLinea, REPLACE(vw.NombrePresentacion, ' - Consolidada', '') AS NombreLinea, p.cMandosOrden AS OrdenLinea, vw.Empresa AS CodigoEmpresa, vw.CodigoCentro, vw.NombreCentro, vw.Tipo, 
                         vw.CodigoSede, vw.NombreSede, vw.Orden AS OrdenSede
FROM            InformesComiteDB.dbo.vw_InformesConfiguracionPresentaciones AS vw LEFT OUTER JOIN
                        InformesComiteDB.dbo.InformesPresentaciones AS p ON vw.CodigoPresentacion = p.CodigoPresentacion
WHERE        (vw.Activo = 1) AND (vw.Orden <> 0) AND (p.cMandos = 1)
GROUP BY vw.Empresa, vw.CodigoPresentacion, p.cMandosOrden, vw.NombrePresentacion, vw.CodigoCentro, vw.NombreCentro, vw.Tipo, vw.CodigoSede, vw.NombreSede, vw.Orden

```
