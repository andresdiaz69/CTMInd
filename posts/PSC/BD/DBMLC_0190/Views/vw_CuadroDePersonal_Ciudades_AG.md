# View: vw_CuadroDePersonal_Ciudades_AG

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_Ciudades_AG] 
--MS:071123 vista del procedimiento sp_CuadroDePersonal_Ciudades poder filtrar la informacion

AS
SELECT Ano_Periodo,Mes_Periodo,[Nombre_unidad_negocio],[Nombre_Ciudad_trabajo],count(*) AS [Empleados]
FROM [EmpleadosActivos] 
--where  Mes_Periodo = 9  
--and Ano_Periodo = 2023
group by Ano_Periodo,Mes_Periodo,Nombre_unidad_negocio, Nombre_Ciudad_trabajo



```
