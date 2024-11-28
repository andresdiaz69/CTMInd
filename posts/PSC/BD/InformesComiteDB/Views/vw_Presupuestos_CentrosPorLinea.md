# View: vw_Presupuestos_CentrosPorLinea

## Usa los objetos:
- [[Presupuestos_LineasMayorista]]
- [[UnidadDeNegocio]]

```sql

 CREATE VIEW [dbo].[vw_Presupuestos_CentrosPorLinea]
 AS
--****************************
--Autor: Manuel Suarez
-- Date: 07/10/2024
--Descr: Alter VW para proyecto presupuestos se agrega la tabla por la donde esta mayorista y se filtra para que no salga la unidaddenegocio 700
--****************************
 SELECT CodCentro, NombreCentro, CodUnidadNegocio, NombreUnidadNegocio
   FROM [DBMLC_0190].dbo.UnidadDeNegocio
  where CodUnidadNegocio <>700	
  group by CodCentro, NombreCentro, CodUnidadNegocio, NombreUnidadNegocio
  union all

 select CodCentro, NomCentro, CodmarcaPresupuestos, NombreMarcaPresupuestos 
   from [dbo].[Presupuestos_LineasMayorista]



```
