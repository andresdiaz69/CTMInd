# View: vw_InformesSedesCentros

## Usa los objetos:
- [[Centros]]
- [[InformesCentros]]
- [[InformesEmpresas]]
- [[InformesPresentaciones]]
- [[InformesPresentacionesSedes]]
- [[InformesSedes]]
- [[InformesSedesCentros]]
- [[Secciones]]
- [[VehiculosMarcas]]

```sql

CREATE VIEW [dbo].[vw_InformesSedesCentros]
AS
SELECT        dbo.InformesPresentaciones.CodigoPresentacion, dbo.InformesPresentaciones.NombrePresentacion, dbo.InformesSedes.CodigoSede, dbo.InformesSedes.NombreSede, dbo.InformesCentros.Empresa, 
                         dbo.InformesEmpresas.NombreEmpresa, dbo.InformesCentros.CodigoCentro, DBMLC_0190.dbo.Centros.NombreCentro, ISNULL(dbo.InformesCentros.CodigoSeccion, '') AS CodigoSeccion, ISNULL( DBMLC_0190.dbo.Secciones.Seccion, 
                         '') AS NombreSeccion, ISNULL(dbo.InformesCentros.Departamento, '') AS Departamento, ISNULL(dbo.InformesCentros.CodigoMarca, '') AS CodigoMarca, ISNULL(DBMLC_0190.dbo.VehiculosMarcas.Marca, '') 
                         AS NombreMarca, dbo.InformesCentros.CentroID, dbo.InformesCentros.Tipo, dbo.InformesCentros.EmpresaPresupuesto, dbo.InformesCentros.DepartamentoPresupuesto
FROM            dbo.InformesSedes LEFT OUTER JOIN
                         dbo.InformesPresentacionesSedes ON dbo.InformesPresentacionesSedes.CodigoSede = dbo.InformesSedes.CodigoSede LEFT OUTER JOIN
                         dbo.InformesPresentaciones ON dbo.InformesPresentaciones.CodigoPresentacion = dbo.InformesPresentacionesSedes.CodigoPresentacion LEFT OUTER JOIN
                         dbo.InformesSedesCentros ON dbo.InformesSedes.CodigoSede = dbo.InformesSedesCentros.CodigoSede LEFT OUTER JOIN
                         dbo.InformesCentros ON dbo.InformesCentros.CentroID = dbo.InformesSedesCentros.CentroID LEFT OUTER JOIN
                          DBMLC_0190.dbo.Secciones ON  DBMLC_0190.dbo.Secciones.CodigoSeccion = dbo.InformesCentros.CodigoSeccion LEFT OUTER JOIN
                         DBMLC_0190.dbo.VehiculosMarcas ON dbo.InformesCentros.CodigoMarca = DBMLC_0190.dbo.VehiculosMarcas.CodigoMarca LEFT OUTER JOIN
                         DBMLC_0190.dbo.Centros ON DBMLC_0190.dbo.Centros.CodigoCentro = dbo.InformesCentros.CodigoCentro LEFT OUTER JOIN
                         dbo.InformesEmpresas ON dbo.InformesCentros.Empresa = dbo.InformesEmpresas.CodigoEmpresa


```
