# View: vw_Presupuestos_Nomina_Salarios_Integrales

## Usa los objetos:
- [[EmpleadosActivos]]
- [[InformesPresentaciones]]
- [[Presupuestos_Nomina_Salarios_Integrales]]
- [[Presupuestos_PresentacionesVsLineas]]
- [[UnidadDeNegocio]]

```sql


CREATE VIEW [dbo].[vw_Presupuestos_Nomina_Salarios_Integrales] 
AS
SELECT DISTINCT psi.CodigoLinea, inp.NombrePresentacion NombreLinea, psi.CodigoCentro, psi.IdClase, un.NombreCentro, psi.CodigoEmpleado, psi.Codigo_Cargo, emp.Nombre_Cargo, psi.salario, PorcentajeDistribucion
  FROM Presupuestos_Nomina_Salarios_Integrales psi
  INNER JOIN  Presupuestos_PresentacionesVsLineas ppvl
      ON ppvl.CodigoLinea = psi.CodigoLinea
  INNER JOIN  InformesPresentaciones inp
      ON inp.CodigoPresentacion = ppvl.CodigoPresentacion
  INNER JOIN (SELECT DISTINCT Codigo_Cargo, Nombre_Cargo, CodigoEmpleado 
                FROM DBMLC_0190.dbo.EmpleadosActivos) emp 
	  ON psi.CodigoEmpleado = emp.CodigoEmpleado
	 AND psi.Codigo_Cargo   = emp.Codigo_Cargo
  INNER JOIN (SELECT DISTINCT CodCentro, NombreCentro
               FROM DBMLC_0190.dbo.UnidadDeNegocio ) un
	  ON un.CodCentro = psi.CodigoCentro
   where PorcentajeDistribucion != 0


```
