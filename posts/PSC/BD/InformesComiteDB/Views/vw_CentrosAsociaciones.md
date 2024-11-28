# View: vw_CentrosAsociaciones

## Usa los objetos:
- [[Centros]]
- [[InformesCentros]]
- [[InformesCentrosTipos]]
- [[InformesEmpresas]]
- [[Secciones]]
- [[VehiculosMarcas]]

```sql

CREATE VIEW [dbo].[vw_CentrosAsociaciones]
AS
SELECT        t1.CentroID, t1.Empresa, t2.NombreEmpresa, t1.CodigoCentro, t4.NombreCentro, ISNULL(t1.CodigoSeccion, '') AS CodigoSeccion, ISNULL(t3.Seccion, '') AS NombreSeccion, t1.Departamento, ISNULL(t1.CodigoMarca, '') 
                         AS CodigoMarca, ISNULL(t5.Marca, '') AS NombreMarca, t1.Tipo, t1.EmpresaPresupuesto, ISNULL(t7.NombreEmpresa, '') AS NombreEmpresaPresupuesto, t1.DepartamentoPresupuesto
FROM            dbo.InformesCentros AS t1 LEFT OUTER JOIN
                         dbo.InformesEmpresas AS t2 ON t1.Empresa = t2.CodigoEmpresa LEFT OUTER JOIN
                         DBMLC_0190.dbo.Secciones AS t3 ON t1.CodigoSeccion = t3.CodigoSeccion LEFT OUTER JOIN
                         DBMLC_0190.dbo.Centros AS t4 ON t1.CodigoCentro = t4.CodigoCentro LEFT OUTER JOIN
                         DBMLC_0190.dbo.VehiculosMarcas AS t5 ON t1.CodigoMarca = t5.CodigoMarca LEFT OUTER JOIN
                         dbo.InformesCentrosTipos AS t6 ON t1.Tipo = t6.TipoCentro LEFT OUTER JOIN
                         dbo.InformesEmpresas AS t7 ON t1.EmpresaPresupuesto = t7.CodigoEmpresa


```
