# View: vw_Presupuestos_DistribucionSalarios_Promedio

## Usa los objetos:
- [[vw_Presupuestos_DistribucionSalarios]]

```sql
CREATE VIEW vw_Presupuestos_DistribucionSalarios_Promedio
AS
SELECT Nombre_Clase_salario 
      ,COUNT([Cedula]) Personas
      ,[Codigo_Cargo]
      ,[Nombre_Cargo]
      ,[Codigo_Cargo_Generico]
      ,[Nombre_Cargo_generico]
      ,[codigo_departamento]
      ,[nombre_departamento]
      ,AVG([salario]) salario
      ,[Nombre_Compañia]
      ,[codCentro]
      ,[nombre_centro]
      ,[Codigo_Marca]
      ,[nombre_marca]
      ,SUM([Porcentaje_Distribucion]) Porcentaje_Distribucion
  FROM [InformesComiteDB].[dbo].[vw_Presupuestos_DistribucionSalarios]
 -- where Codigo_Marca = 19 AND codigo_departamento = 'VN' AND codCentro = 1
  group by  [Nombre_Clase_salario],
       [Codigo_Cargo]
      ,[Nombre_Cargo]
      ,[Codigo_Cargo_Generico]
      ,[Nombre_Cargo_generico]
      ,[codigo_departamento]
      ,[nombre_departamento]
	   ,[Nombre_Compañia]
      ,[codCentro]
      ,[nombre_centro]
      ,[Codigo_Marca]
      ,[nombre_marca]
```
