# View: vw_InformesConfiguracionPresentaciones

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

CREATE VIEW [dbo].[vw_InformesConfiguracionPresentaciones]
AS
SELECT        TOP (100) PERCENT t1.CodigoPresentacion, t1.NombrePresentacion, t3.CodigoSede, t3.NombreSede, t5.Tipo, t5.Empresa, t8.NombreEmpresa, t5.CodigoCentro, t5.CentroID, ISNULL(t5.CodigoSeccion, '') AS CodigoSeccion, 
                         ISNULL(t7.Seccion, '') AS NombreSeccion, ISNULL(t5.CodigoMarca, '') AS CodigoMarca, ISNULL(t9.Marca, '') AS NombreMarca, ISNULL(t5.Departamento, '') AS Departamento, t5.EmpresaPresupuesto, 
                         t5.DepartamentoPresupuesto, t3.Diferencia, t2.Orden, t5.Activo, t3.Ciudad, t3.Departamento AS DptoGeografico, t6.NombreCentro
FROM            dbo.InformesPresentaciones AS t1 LEFT OUTER JOIN
                         dbo.InformesPresentacionesSedes AS t2 ON t1.CodigoPresentacion = t2.CodigoPresentacion LEFT OUTER JOIN
                         dbo.InformesSedes AS t3 ON t2.CodigoSede = t3.CodigoSede LEFT OUTER JOIN
                         dbo.InformesSedesCentros AS t4 ON t3.CodigoSede = t4.CodigoSede LEFT OUTER JOIN
                         dbo.InformesCentros AS t5 ON t4.CentroID = t5.CentroID LEFT OUTER JOIN
                         DBMLC_0190.dbo.Centros AS t6 ON t5.CodigoCentro = t6.CodigoCentro LEFT OUTER JOIN
                         DBMLC_0190.dbo.Secciones AS t7 ON t5.CodigoSeccion = t7.CodigoSeccion LEFT OUTER JOIN
                         dbo.InformesEmpresas AS t8 ON t5.Empresa = t8.CodigoEmpresa LEFT OUTER JOIN
                         DBMLC_0190.dbo.VehiculosMarcas AS t9 ON t5.CodigoMarca = t9.CodigoMarca


```
