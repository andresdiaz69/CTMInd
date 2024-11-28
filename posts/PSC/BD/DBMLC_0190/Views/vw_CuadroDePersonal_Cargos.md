# View: vw_CuadroDePersonal_Cargos

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_Cargos] as
	--MS:021123 vista del procedimiento sp_CuadroDePersonal_Cargos para poder filtrar la informacion
	
SELECT Ano_Periodo,Mes_Periodo, [Marca],count(*) AS [Empleados],[Nombre_Cargo_generico]
  FROM [EmpleadosActivos] 
 --where Mes_Periodo = 9
 --  and Ano_Periodo = 2023
 group by Ano_Periodo,Mes_Periodo, Marca, Nombre_Cargo_generico
			
			

```
