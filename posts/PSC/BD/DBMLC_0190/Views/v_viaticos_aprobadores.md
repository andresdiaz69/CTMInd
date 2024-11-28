# View: v_viaticos_aprobadores

## Usa los objetos:
- [[EmpleadosActivos]]
- [[Viaticos_Autorizaciones]]

```sql


CREATE VIEW [dbo].[v_viaticos_aprobadores]

AS	

SELECT DISTINCT(CodigoAprobador)as 'CodigoAprobador' ,CONCAT(d.Nombres,' ',d.Apellido1,' ',d.Apellido2) as 'Aprobador' 
FROM Viaticos_Autorizaciones as v
inner join  EmpleadosActivos as d on v.CodigoAprobador = d.CodigoEmpleado


```
