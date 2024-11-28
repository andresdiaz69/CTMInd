# View: vw_CuadroDePersonal_Ciudades

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_Ciudades] 
--MS:071123 vista del procedimiento sp_CuadroDePersonal_Ciudades poder filtrar la informacion
AS

SELECT Ano_Periodo,Mes_Periodo,[Marca],count(*) AS [Empleados],[Nombre_Ciudad_trabajo]
  FROM [EmpleadosActivos] 
 --where Mes_Periodo = 9   
 --  and Ano_Periodo = 2023 
group by Ano_Periodo,Mes_Periodo,Marca, Nombre_Ciudad_trabajo










```
