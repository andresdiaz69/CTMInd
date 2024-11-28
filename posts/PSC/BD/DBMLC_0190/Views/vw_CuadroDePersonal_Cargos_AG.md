# View: vw_CuadroDePersonal_Cargos_AG

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_Cargos_AG] as
--MS:021123 vista del procedimiento sp_CuadroDePersonal_Cargos_AGpara poder filtrar la informacion

SELECT Ano_Periodo,Mes_Periodo,[Nombre_unidad_negocio],[Nombre_Cargo_generico],count(*) AS [Empleados]
  FROM [EmpleadosActivos] 
 --where Mes_Periodo = 9 
  -- and Ano_Periodo = 2023
  group by Ano_Periodo,Mes_Periodo,Nombre_unidad_negocio, Nombre_Cargo_generico



```
