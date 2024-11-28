# View: vw_Citas_Agendadas_ContactCenter

## Usa los objetos:
- [[spiga_OrdenesDeTrabajoCitasConOT]]
- [[spiga_OrdenesDeTrabajoCitasSinOT]]
- [[vw_empleados_taller]]

```sql


--Citas Agendadas por Contact Center (Agendamiento de Citas)
CREATE View [dbo].[vw_Citas_Agendadas_ContactCenter] as

select AñoCita,MesCita,AñoAltaCita,MesAltaCita,IdEmpresas,IdCentros,IdCitas,NifCifEmpleado
from 
(
SELECT DISTINCT AñoCita=year(FechaCita), MesCita=month(FechaCita), AñoAltaCita=year(FechaAltaCita), MesAltaCita=month(FechaAltaCita), c.IdEmpresas, c.IdCentros, c.IdCitas, 
c.NifCifEmpleado,e.codigo_departamento
FROM [PSCService_DB].[dbo].[spiga_OrdenesDeTrabajoCitasConOT]			c
left join vw_empleados_taller			e	on	c.NifCifEmpleado = e.codigoempleado AND  year(c.FechaCita) = e.Ano_Periodo
																					AND month(c.FechaCita) = e.mes_periodo
WHERE c.IdCitaTipos <> 2
--AND e.codigo_departamento NOT IN ('TC','TM') 
--and NifCifEmpleado = '1019106689'

UNION ALL

SELECT DISTINCT AñoCita=year(FechaCita), MesCita=month(FechaCita), AñoAltaCita=year(FechaAltaCita), MesAltaCita=month(FechaAltaCita), c.IdEmpresas, 
c.IdCentros, c.IdCitas, c.NifCifEmpleado,e.codigo_departamento
FROM [PSCService_DB].[dbo].[spiga_OrdenesDeTrabajoCitasSinOT]			c

LEFT JOIN vw_empleados_taller			e	on	c.NifCifEmpleado = e.codigoempleado AND  year(c.FechaCita) = e.Ano_Periodo
																					AND month(c.FechaCita) = e.mes_periodo
WHERE c.IdCitaTipos <> 2
--AND e.codigo_departamento NOT IN ('TC','TM')
--and NifCifEmpleado = '1019106689'
) a 
where (codigo_departamento NOT IN ('TC','TM') or codigo_departamento is null)
--and  añocita = 2019 and MesCita = 10
--and NifCifEmpleado in( '1019106689','1015413409')


--select * FROM [PSCService_DB].[dbo].[spiga_OrdenesDeTrabajoCitasConOT]		 where NifCifEmpleado = '1019106689'

```
