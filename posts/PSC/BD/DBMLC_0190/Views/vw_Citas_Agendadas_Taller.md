# View: vw_Citas_Agendadas_Taller

## Usa los objetos:
- [[spiga_OrdenesDeTrabajoCitasConOT]]
- [[spiga_OrdenesDeTrabajoCitasSinOT]]
- [[vw_empleados_taller]]

```sql


--Citas Agendadas por Taller (Agendamiento de Citas)
CREATE VIEW [dbo].[vw_Citas_Agendadas_Taller] as

SELECT DISTINCT AñoCita=YEAR(FechaCita), MesCita=MONTH(FechaCita), AñoAltaCita=YEAR(FechaAltaCita), MesAltaCita=MONTH(FechaAltaCita), c.IdEmpresas, c.IdCentros, c.IdCitas, c.NifCifEmpleado
FROM [PSCService_DB].[dbo].[spiga_OrdenesDeTrabajoCitasConOT]			c

LEFT JOIN vw_empleados_taller			e	ON	c.NifCifEmpleado = e.codigoempleado AND year(c.FechaCita) = e.Ano_Periodo
																					AND month(c.FechaCita) = e.mes_periodo
WHERE c.IdCitaTipos <> 2
AND e.codigo_departamento  IN ('TC','TM')

UNION ALL

SELECT DISTINCT AñoCita=YEAR(FechaCita), MesCita=MONTH(FechaCita), AñoAltaCita=YEAR(FechaAltaCita), MesAltaCita=MONTH(FechaAltaCita), c.IdEmpresas, c.IdCentros, c.IdCitas, c.NifCifEmpleado
FROM [PSCService_DB].[dbo].[spiga_OrdenesDeTrabajoCitasSinOT]			c

LEFT JOIN vw_empleados_taller			e	on	c.NifCifEmpleado = e.codigoempleado AND YEAR(c.FechaCita) = e.Ano_Periodo
																					AND MONTH(c.FechaCita) = e.mes_periodo
WHERE c.IdCitaTipos <> 2
AND e.codigo_departamento  IN ('TC','TM')


```
