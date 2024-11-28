# View: vw_CuadroDePersonal_JuntaDirectivaMM

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_JuntaDirectivaMM]
--MS:141123 vista del procedimiento sp_CuadroDePersonal_JuntaDirectivaMM poder filtrar la informacion
AS
SELECT ano_periodo,mes_periodo,row_number() over( order by Nombre_Cargo_Junta  asc) Orden, Nombre_Cargo_Junta,marca, sum(Cantidad) can

from (
SELECT case when Mes_Periodo=1 then 12 else Mes_Periodo+1 end Mes_Periodo,
       case when Mes_Periodo = 12 then  Ano_Periodo+1 else Ano_Periodo end Ano_Periodo,[Nombre_Cargo_Junta],rtrim(Marca)+( 'Anterior' ) Marca,Count(*) Cantidad
  FROM [EmpleadosActivos]  
  WHERE CodigoEmpresa = 6 
  --and Ano_Periodo=2023
 -- and ( Ano_Periodo =(case when Mes_Periodo=1 then (Ano_Periodo -1)  else year(getdate())  end) )
  GROUP BY Mes_Periodo,Ano_Periodo,Nombre_Cargo_Junta, Marca,Mes_Periodo
union
SELECT Mes_Periodo,Ano_Periodo,[Nombre_Cargo_Junta],rtrim(Marca)+('Actual') Marca,Count(*) Cantidad
  FROM [EmpleadosActivos]  
  WHERE CodigoEmpresa = 6 
  GROUP BY Mes_Periodo,Ano_Periodo,Nombre_Cargo_Junta, Marca,Mes_Periodo
union
SELECT Mes_Periodo,Ano_Periodo+1 Ano_Periodo,Nombre_Cargo_Junta,'AñoAnterior' Marca, count(*) Cantidad
	FROM EmpleadosActivos
	WHERE CodigoEmpresa = 6  	
	GROUP BY Mes_Periodo,Ano_Periodo,Nombre_Cargo_Junta
) x
														  
--WHERE Mes_Periodo = 9 
--AND Ano_Periodo =2023
group by ano_periodo,mes_periodo,Nombre_Cargo_Junta,marca

```
