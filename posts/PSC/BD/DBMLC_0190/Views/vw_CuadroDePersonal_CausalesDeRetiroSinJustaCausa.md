# View: vw_CuadroDePersonal_CausalesDeRetiroSinJustaCausa

## Usa los objetos:
- [[EmpleadosRetirados]]

```sql
CREATE view  [dbo].[vw_CuadroDePersonal_CausalesDeRetiroSinJustaCausa]
--MS:071123 vista del procedimiento sp_CuadroDePersonal_CausalesDeRetiroSinJustaCausa poder filtrar la informacion
AS
	
select Ano_Periodo,Mes_Periodo,Fecha_retiro, 'Despido Sin Justa Causa (6 Meses)'    CausaRetiro, empresa, count(Codigoempleado) retirados
  from EmpleadosRetirados 
 where CausaRetiro='DESPIDO SIN JUSTA CAUSA'

group by Ano_Periodo,Mes_Periodo,Fecha_retiro, CausaRetiro, empresa 


```
