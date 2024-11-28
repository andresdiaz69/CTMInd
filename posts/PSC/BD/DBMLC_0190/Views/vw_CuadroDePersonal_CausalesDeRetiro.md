# View: vw_CuadroDePersonal_CausalesDeRetiro

## Usa los objetos:
- [[EmpleadosRetirados]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_CausalesDeRetiro]
--MS:021123 vista del procedimiento sp_CuadroDePersonal_CausalesDeRetiro poder filtrar la informacion
AS

select Ano_Periodo,Mes_Periodo,CausaRetiro, empresa, count(codigoempleado) empleados
  from EmpleadosRetirados 
 --where Ano_Periodo =	2023
  -- and Mes_Periodo <= 9
 group by Ano_Periodo,Mes_Periodo,CausaRetiro, empresa




```
