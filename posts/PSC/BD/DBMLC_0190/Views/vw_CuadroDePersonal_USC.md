# View: vw_CuadroDePersonal_USC

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_USC]
--MS:161123 vista del procedimiento sp_CuadroDePersonal_USC para poder filtrar la informacion
AS
SELECT Ano_Periodo,Mes_Periodo,row_number() over( order by Seccion  asc) Orden, seccion,  Nombre_Tipo_Contrato ,sum(Cantidad) Total_General 
from (
SELECT Ano_Periodo,Mes_Periodo,case	when (nombre_seccion like '%_%' and charindex(' ',nombre_seccion,1)=3) then substring(nombre_seccion,4,20) 
		    else nombre_seccion end Seccion,Nombre_Tipo_Contrato ,count(*) Cantidad
  FROM [EmpleadosActivos]
 where Unidad_negocio = 4
 group by Ano_Periodo,Mes_Periodo,substring(nombre_seccion,4,20),[Nombre_Tipo_Contrato],nombre_seccion
)x 
 --where Mes_Periodo = 9 
 --and Ano_Periodo = 2023  
group by Ano_Periodo,Mes_Periodo,Seccion, Nombre_Tipo_Contrato


```
