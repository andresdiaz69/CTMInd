# View: vw_EmpleadosEmailCorporativo

## Usa los objetos:
- [[v_EmpleadosActivosRetirados]]

```sql
CREATE  view vw_EmpleadosEmailCorporativo as
select Ano_Periodo,Mes_Periodo,CodigoEmpleado,Email_Corporativo
from(
	select orden=row_number() over(partition by Codigoempleado order by ano_periodo,mes_periodo desc), ano_periodo,mes_periodo,CodigoEmpleado,Email_Corporativo
	from v_EmpleadosActivosRetirados
	where Email_Corporativo <> ' '  
	and Ano_Periodo= year(getdate())
) a where orden = 1


```
